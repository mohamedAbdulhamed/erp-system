using ManagementSystem.Core.IConfiguration;
using ManagementSystem.Models;
using ManagementSystem.Services;
using Microsoft.AspNetCore.Mvc;

namespace ManagementSystem.Controller;

[Route("api/[controller]")]
[ApiController]
public class CustomerOrderController(IUnitOfWork unitOfWork, IAuthService authService) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IAuthService _authService = authService;


    [HttpGet]
    public async Task<ActionResult<IEnumerable<CustomerOrder>>> GetAll()
    {
        var customerOrders = await _unitOfWork.CustomerOrders.GetAllAsync();
        if (customerOrders.Any()) return Ok(customerOrders);
        else return NotFound("No customer orders yet!");
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CustomerOrder>> GetById(int id)
    {
        // format => (Admin format - contains all the details, Client format - Fewer details)
        var customerOrder = await _unitOfWork.CustomerOrders.GetByIdAsync(id);
        if (customerOrder is null)
        {
            return NotFound("This order does not exist!");
        }

        return Ok(customerOrder);
    }

    [HttpPost]
    public async Task<ActionResult<CustomerOrder>> Add([FromBody] CustomerOrder customerOrder)
    {
        var user = await _authService.GetUser(User);
        if (user is null) return Unauthorized("User couldn't be found");

        if (await _unitOfWork.CustomerOrders.AddAsync(customerOrder))
        {
            // Update inventory --
            await _unitOfWork.CompleteAsync();
        }

        return CreatedAtAction(nameof(GetById), new { id = customerOrder.CustomerOrderID }, customerOrder);
    }

    // Order Details
    // 
}
