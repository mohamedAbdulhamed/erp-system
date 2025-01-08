using Management_System.Dtos.Inventory;
using ManagementSystem.Core.IConfiguration;
using ManagementSystem.Models;
using ManagementSystem.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;

namespace Management_System.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAuthService _authService;
        private readonly ILogger _logger;

        public InventoryController(IUnitOfWork unitOfWork, IAuthService authService, ILogger logger)
        {
            _unitOfWork = unitOfWork;
            _authService = authService;
            _logger = logger;
        }

        [HttpGet("GetAll")]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var inventories = await _unitOfWork.Inventories.GetAllAsync();
                if (inventories == null ) return NotFound("No Inventories have been found");
                return Ok(inventories);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in get all Inventories");
                return StatusCode(500, ex.Message);
            }

        }
        
        [HttpGet("GetById{id}")] 
        [Authorize]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var existingInventory = await _unitOfWork.Inventories.GetByIdAsync(id);
                if (existingInventory == null) return NotFound("No Inventory have been found ");
                return Ok("Order has been added");
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in getById Inventories");
                return StatusCode(500, ex.Message);
            }

        }

        [HttpPost("Add")]
        [Authorize]
        public async Task<IActionResult> Add(CreateInventoryRequest model)
        {
            try
            {
                var Inventory = new Inventory()
                {
                    Address = model.Address,
                    Name = model.Name,
                    ContactNumber = model.ContactNumber,
                    inventoryType = model.inventoryType
                };
                await _unitOfWork.Inventories.AddAsync(Inventory);
                await _unitOfWork.CompleteAsync();
                return Ok("Inventory was added");
            } 
            catch(Exception ex)
            {
                _logger.LogError("Error in add Inventory");
                return StatusCode(500, ex.Message);
            }   
        }

        [HttpPut("Update")]
        [Authorize]
        public async Task<IActionResult> Update(int id)
        {
            try
            {
                var existingInventory = await _unitOfWork.Inventories.GetByIdAsync(id);
                if (existingInventory == null) return NotFound("No Inventory have been found ");


                await _unitOfWork.Inventories.UpdateAsync();
                await _unitOfWork.CompleteAsync();
                return Ok("Inventory was updated");
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in update Inventory");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("Delete")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var existingInventory = await _unitOfWork.Inventories.GetByIdAsync(id);
                if (existingInventory == null) return NotFound("No Inventory have been found ");
                await _unitOfWork.Inventories.DeleteAsync(id);
                await _unitOfWork.CompleteAsync();
                return Ok("Inventory was deleted");
            }
            catch(Exception ex)
            {
                _logger.LogError("Error in delete Inventory");
                return StatusCode(500, ex.Message);
            }
        }
    }
}
