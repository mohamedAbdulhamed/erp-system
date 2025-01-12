using ManagementSystem.Core.IConfiguration;
using ManagementSystem.Dtos.CustomerOrderTransaction;
using ManagementSystem.Dtos.SupplierOrderTransaction;
using ManagementSystem.Models;
using ManagementSystem.Services;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ManagementSystem.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierOrderTransactionController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAuthService _authService;
        private readonly ILogger<SupplierOrderTransactionController> _logger;
        private readonly IMapper _mapper;
        public SupplierOrderTransactionController(
            IUnitOfWork unitOfWork,
            IAuthService authService,
            ILogger<SupplierOrderTransactionController> logger,
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _authService = authService;
            _logger = logger;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        [Authorize(Roles = "Admin,Accountant")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var user = await _authService.GetUser(User);
                var supplierTransactions = await _unitOfWork.SupplierOrderTransactions.GetAllAsync();
                if (supplierTransactions.Count() == 0) return BadRequest("no transactions found");
                return Ok(supplierTransactions);

            }
            catch (Exception ex)
            {
                _logger.LogError("Error in get all SupplierOrderTransaction");
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet("GetAllSupplierTransactions{supplierID}")]
        [Authorize(Roles = "Admin,Accountant")]
        public async Task<IActionResult> GetAllSupplierTransactions(int supplierID)
        {
            try
            {
                if (await _unitOfWork.Suppliers.GetByIdAsync(supplierID) == null) return NotFound("Supplier not found");
                var supplierTransactions = await _unitOfWork.SupplierOrderTransactions.FindAllAsync(c => c.SupplierID == supplierID);
                if (supplierTransactions == null) return NotFound("there is no transactions for this supplier");
                return Ok(supplierTransactions);

            }
            catch (Exception ex)
            {
                _logger.LogError("Error in GetAllSupplierTransactions");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetById{id}")]
        //[Authorize(Roles = "Admin,Accountant")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var existingSupplierTransaction = await _unitOfWork.SupplierOrderTransactions.GetByIdAsync(id);
                if (existingSupplierTransaction == null) return NotFound("No supplierTransaction has been found ");
                return Ok(existingSupplierTransaction);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in getById Inventories");
                return StatusCode(500, ex.Message);
            }

        }


        [HttpPost("Add")]
        //[Authorize(Roles = "Admin,Accountant")]
        public async Task<IActionResult> Add(CreateSupplierOrderTransactionRequest model)
        {
            try
            {
                if (await _unitOfWork.Suppliers.FindAsync(c => c.SupplierID == model.SupplierID) == null) return BadRequest("this supplier isn't exist");
                var supplierOrderTransaction = _mapper.Map<SupplierOrderTransaction>(model);
                await _unitOfWork.SupplierOrderTransactions.AddAsync(supplierOrderTransaction);
                if (!await _unitOfWork.SupplierBalances.ProcessAddTransaction(supplierOrderTransaction)) return BadRequest();
                await _unitOfWork.CompleteAsync();
                return Ok("SupplierOrderTransaction was added");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, "Error in add SupplierOrderTransaction");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("Update")]
        // [Authorize(Roles = "Admin,Accountant")]
        public async Task<IActionResult> Update( UpdateSupplierOrderTransactionRequest model)
        {
            try
            {
                if (await _unitOfWork.Suppliers.FindAsync(c => c.SupplierID == model.SupplierID) == null) return BadRequest("this supplier isn't exist");
                var oldTransaction = await _unitOfWork.SupplierOrderTransactions.FindAsync(c => c.TransactionID == model.TransactionID);
                if (oldTransaction == null) return NotFound("transaction not found");
                var newTransaction = _mapper.Map<SupplierOrderTransaction>(model);
                newTransaction.TransactionID = oldTransaction.TransactionID;
                await _unitOfWork.SupplierOrderTransactions.UpdateAsync(newTransaction);
                if (!await _unitOfWork.SupplierBalances.ProcessUpdateTransaction(oldTransaction, newTransaction)) return BadRequest();
                await _unitOfWork.CompleteAsync();
                return Ok("SupplierOrderTransaction was updated");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, "Error in add SupplierOrderTransaction");
                return StatusCode(500, ex.Message);
            }
        }



        [HttpDelete("Delete{id}")]
        // [Authorize(Roles = "Admin,Accountant")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var ExistingTransaction = await _unitOfWork.SupplierOrderTransactions.GetByIdAsync(id);
                if (ExistingTransaction == null) return NotFound("SupplierOrderTransaction isn't Exist");
                await _unitOfWork.CustomerOrderTransactions.DeleteAsync(id);
                if (!await _unitOfWork.SupplierBalances.ProcessDeleteTransaction(ExistingTransaction)) return BadRequest();
                await _unitOfWork.CompleteAsync();
                return Ok("SupplierOrderTransaction was deleted");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, "Error in Delete SupplierOrderTransaction");
                return StatusCode(500, ex.Message);
            }
        }


    }
}
