using ManagementSystem.Dtos.Customer;
using ManagementSystem.Core.IConfiguration;
using ManagementSystem.Models;
using ManagementSystem.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MapsterMapper;
using Mapster;
using ManagementSystem.Dtos.Supplier;

namespace ManagementSystem.Controller
{
    [Route("api/[controller]")]
    [ApiController]

    public class CustomerController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAuthService _authService;
        private readonly ILogger<CustomerController> _logger;
        private readonly IMapper _mapper;
        public CustomerController(IUnitOfWork unitOfWork, IAuthService authService, ILogger<CustomerController> logger, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _authService = authService;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            try
            {

                var customers = await _unitOfWork.Customers.FindAllAsync(c => c.IsActive);
                var customersRes = _mapper.Map<List<CustomerResponse>>(customers);
                return Ok(customersRes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetById{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var customer = await _unitOfWork.Customers.FindAsync(c => c.CustomerID == id, c => c.CustomerOrderTransactions);
                if (customer == null) return NotFound($"Customer with {id} not found");
                return Ok(customer);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, "Error in GetById customer contoller");
                return StatusCode(500, ex.Message);
            }

        }

        [HttpPost("AddCustomer")]
        //[Authorize]
        public async Task<IActionResult> AddCustomer(CreateCustomerRequest model)
        {
            try
            {
                var user = await _authService.GetUser(User);
                //if (user == null) return Unauthorized("User couldn't be found");
                var customer = _mapper.Map<Customer>(model);
                if (customer == null) return BadRequest();
                await _unitOfWork.Customers.AddAsync(customer);
                await _unitOfWork.CompleteAsync();
                var addedCustomer = await _unitOfWork.Customers.FindAsync(c => c.PhoneNumber.Contains(model.PhoneNumber));
                if (addedCustomer == null) return BadRequest("Customer wasn't added");
                var customerBalance = new CustomerBalance { CustomerID = addedCustomer.CustomerID };
                await _unitOfWork.CustomerBalances.AddAsync(customerBalance);
                await _unitOfWork.CompleteAsync();
                return Ok("Customer was added");

            }
            catch (Exception ex)
            {

                _logger.LogError(ex.Message, "Error in add Customer contoller");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update(UpdateCustomerRequest model)
        {
            try
            {
                var customer = await _unitOfWork.Customers.GetByIdAsync(model.CustomerID);
                if (customer == null) return BadRequest("Customer Couldn't be found");
                customer.PhoneNumber = model.PhoneNumber;
                customer.CustomerName = model.CustomerName;
                _unitOfWork.Customers.Update(customer);
                await _unitOfWork.CompleteAsync();
                return Ok("Customer was Updted successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, "Error in Update customer contoller");
                return StatusCode(500, ex.Message);
            }

        }

        [HttpPut("ActivateCustomer{id}")]
        public async Task<IActionResult> ActivateCustomer(int id)
        {
            try
            {
                var customer = await _unitOfWork.Customers.GetByIdAsync(id);
                if (customer == null) return BadRequest("customer Couldn't be found");
                if (customer.IsActive == true) return BadRequest("Customer already active");
                customer.IsActive = true;
                 _unitOfWork.Customers.Update(customer);
                await _unitOfWork.CompleteAsync();
                return Ok("Customer was updated successfully");

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, "Error in ActiveCustomerr customer contoller");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("DeactivateCustomer{id}")]
        public async Task<IActionResult> DeactivateCustomer(int id)
        {
            try
            {
                var customer = await _unitOfWork.Customers.GetByIdAsync(id);
                if (customer == null) return BadRequest("customer Couldn't be found");
                if (customer.IsActive == false) return BadRequest("Customer already not active");
                customer.IsActive = false;
                 _unitOfWork.Customers.Update(customer);
                await _unitOfWork.CompleteAsync();
                return Ok("Customer was updated successfully");

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, "Error in DeactiveCustomer Customer contoller");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("Delete{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var customer = await _unitOfWork.Customers.GetByIdAsync(id);
                if (customer == null) return BadRequest("Customer Couldn't be found");
                await _unitOfWork.Customers.DeleteAsync(id);
                await _unitOfWork.CompleteAsync();
                return Ok("Customer was Deleted successfully");

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, "Error in Delete Customer contoller");
                return StatusCode(500, ex.Message);
            }

        }
    }
}    
