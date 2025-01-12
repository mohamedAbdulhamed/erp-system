using ManagementSystem.Core.IConfiguration;
using ManagementSystem.Dtos.CustomerOrderTransaction;
using ManagementSystem.Models;
using ManagementSystem.Services;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace ManagementSystem.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerOrderTransactionController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAuthService _authService;
        private readonly ILogger<CustomerOrderTransactionController> _logger;
        private readonly IMapper _mapper;
        public CustomerOrderTransactionController(
            IUnitOfWork unitOfWork,
            IAuthService authService,
            ILogger<CustomerOrderTransactionController> logger,
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _authService = authService;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet("GetAll")]
       // [Authorize(Roles = "Admin,Accountant")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var user = await _authService.GetUser(User);
                var customerTransactions = await _unitOfWork.CustomerOrderTransactions.GetAllAsync();
                return Ok(customerTransactions);

            }
            catch (Exception ex)
            {
                _logger.LogError("Error in get all CustomerOrderTransaction");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetAllCustomerTransactions{customerID}")]
        [Authorize(Roles = "Admin,Accountant")]
        public async Task<IActionResult> GetAllCustomerTransactions(int customerID)
        {
            try
            {
                if( await _unitOfWork .Customers.GetByIdAsync(customerID) == null ) return NotFound("Customer not found");
                var customerTransactions = await _unitOfWork.CustomerOrderTransactions.FindAllAsync(c=>c.CustomerID==customerID);
                if (customerTransactions == null) return NotFound("there is no transactions for this customer");
                return Ok(customerTransactions);

            }
            catch (Exception ex)
            {
                _logger.LogError("Error in GetAllCustomerTransactions");
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet("GetById{id}")]
        //[Authorize(Roles = "Admin,Accountant")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var existingcustomerTransaction = await _unitOfWork.CustomerOrderTransactions.GetByIdAsync(id);
                if (existingcustomerTransaction == null) return NotFound("No customerTransaction have been found ");
                return Ok(existingcustomerTransaction);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in getById Inventories");
                return StatusCode(500, ex.Message);
            }

        }

        [HttpPost("Add")]
        //[Authorize(Roles = "Admin,Accountant")]
        public async Task<IActionResult> Add(CreateCustomerOrderTransactionRequest model)
        {
            try
            {
                if (await _unitOfWork.Customers.FindAsync(c=>c.CustomerID==model.CustomerID) == null) return BadRequest("this customer isn't exist");
                var customerOrderTransaction = _mapper.Map<CustomerOrderTransaction>(model);
                await _unitOfWork.CustomerOrderTransactions.AddAsync(customerOrderTransaction);
                if (!await _unitOfWork.CustomerBalances.ProcessAddTransaction(customerOrderTransaction)) return BadRequest();
                await _unitOfWork.CompleteAsync();
                return Ok("CustomerOrderTransaction was added");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message,"Error in add CustomerOrderTransaction");
                return StatusCode(500, ex.Message);
            }
        }
        
        [HttpPut("Update")]
       // [Authorize(Roles = "Admin,Accountant")]
        public async Task<IActionResult> Update(UpdateCustomerOrderTransactionRequest model)
        {
            try
            {
                if (await _unitOfWork.Customers.FindAsync(c=>c.CustomerID==model.CustomerID) == null) return BadRequest("this customer isn't exist");
                var oldTransaction = await _unitOfWork.CustomerOrderTransactions.FindAsync(c=>c.TransactionID == model.TransactionID);
                if (oldTransaction == null) return NotFound("transaction not found");
                var newTransaction = _mapper.Map<CustomerOrderTransaction>(model);
                newTransaction.TransactionID = oldTransaction.TransactionID;
                 _unitOfWork.CustomerOrderTransactions.Update(newTransaction);
                if (!await _unitOfWork.CustomerBalances.ProcessUpdateTransaction(oldTransaction,newTransaction))return BadRequest();
                await _unitOfWork.CompleteAsync();
                return Ok("CustomerOrderTransaction was updated");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message,"Error in add CustomerOrderTransaction");
                return StatusCode(500, ex.Message);
            }
        }
        


        [HttpDelete("Delete{id}")]
       // [Authorize(Roles = "Admin,Accountant")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var ExistingTransaction = await _unitOfWork.CustomerOrderTransactions.GetByIdAsync(id);
                if (ExistingTransaction == null) return NotFound("CustomerOrderTransaction isn't Exist");
                await _unitOfWork.CustomerOrderTransactions.DeleteAsync(id);
                if(! await _unitOfWork.CustomerBalances.ProcessDeleteTransaction(ExistingTransaction)) return BadRequest();
                await _unitOfWork.CompleteAsync();
                return Ok("CustomerOrderTransaction was deleted");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, "Error in Delete CustomerOrderTransaction");
                return StatusCode(500, ex.Message);
            }
        }
    }
}
