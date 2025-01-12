using ManagementSystem.Core.IConfiguration;
using ManagementSystem.Dtos.CustomerBalance;
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
    public class CustomerBalanceController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAuthService _authService;
        private readonly ILogger<CustomerBalanceController> _logger;
        private readonly IMapper _mapper;
        public CustomerBalanceController(
            IUnitOfWork unitOfWork,
            IAuthService authService,
            ILogger<CustomerBalanceController> logger,
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _authService = authService;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet("GetAll")]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var customerBalances = await _unitOfWork.CustomerBalances.FindAllAsync(b => b.Customer.IsActive == true);
                if (customerBalances == null) return NotFound("No balances are found");
                return Ok(customerBalances);
            }
            catch (Exception ex) {
                _logger.LogError(ex.Message, "Error in GetAll => CustomerBalanceController ");
                return StatusCode(500,ex.Message);
            }
        }

        [HttpGet("GetById{id}")]
        [Authorize]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var customerBalance = await _unitOfWork.CustomerBalances.FindAsync(b => b.CustomerID==id);
                if (customerBalance == null) return NotFound("No balance is found");
                return Ok(customerBalance);
            }
            catch (Exception ex) {
                _logger.LogError(ex.Message, "Error in GetById => CustomerBalanceController ");
                return StatusCode(500,ex.Message);
            }
        }

        [HttpPost("Add")]
        [Authorize]
        public async Task<IActionResult> Add(CreateCustomerBalanceRequest model)
        {
            try
            {
                if (await _unitOfWork.Customers.FindAsync(c => c.CustomerID == model.CustomerID) == null) return BadRequest("this customer isn't exist");
                var customerBalance = _mapper.Map<CustomerBalance>(model);
                await _unitOfWork.CustomerBalances.UpdateAsync(customerBalance);
                await _unitOfWork.CompleteAsync();
                return Ok("Customer balance is added successfully");
            }
            catch (Exception ex) 
            {
                _logger.LogError(ex.Message, "Error in Add => CustomerBalanceController ");
                return StatusCode(500, ex.Message);
            }
        }

    }
}

