using Management_System.Dtos.Customer;
using ManagementSystem.Core.IConfiguration;
using ManagementSystem.Models;
using ManagementSystem.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Management_System.Controller
{
    [Route("api/[controller]")]
    [ApiController]

    public class CustomerController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAuthService _authService;
        public CustomerController(IUnitOfWork unitOfWork, IAuthService authService)
        {
            _unitOfWork = unitOfWork;
            _authService = authService;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var customers = await _unitOfWork.Customers.GetAllAsync();
            return Ok(customers);
        }

        [HttpGet("GetById{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            
            var customer = await _unitOfWork.Customers.GetByIdAsync(id);
            return Ok(customer);
            
        }

        [HttpPost("AddCustomer")]
        //[Authorize]
        public async Task<IActionResult> AddCustomer(CreateCustomerRequest model)
        {
            var user = await _authService.GetUser(User);
            //if (user == null) return Unauthorized("User couldn't be found");
            var cus = new Customer
            {
                CustomerName = model.CustomerName,
                ContactNumber = model.ContactNumber,
                Address = model.Address,
                

            };
            if (cus != null)
            {
                await _unitOfWork.Customers.AddAsync(cus);
                await _unitOfWork.CompleteAsync();
                return Ok("Customer was added");
            }
            return BadRequest();
        }

        [HttpPut("ActivateCustomer{id}")]
        public async Task<IActionResult> ActivateCustomer(int id)
        {
            var customer = await _unitOfWork.Customers.GetByIdAsync(id);
            if (customer == null) return BadRequest("customer Couldn't be found");
            if (customer.IsActive == true) return BadRequest("Customer already active");
            customer.IsActive = true;
            await _unitOfWork.Customers.UpdateAsync(customer);
            await _unitOfWork.CompleteAsync();
            return Ok("Customer was updated successfully");
        }
        [HttpPut("DeactivateCustomer{id}")]
        public async Task<IActionResult> DeactivateCustomer(int id)
        {
            var customer = await _unitOfWork.Customers.GetByIdAsync(id);
            if (customer == null) return BadRequest("customer Couldn't be found");
            if (customer.IsActive == false) return BadRequest("Customer already not active");
            customer.IsActive = false;
            await _unitOfWork.Customers.UpdateAsync(customer);
            await _unitOfWork.CompleteAsync();
            return Ok("Customer was updated successfully");
        }
        
    }
}
