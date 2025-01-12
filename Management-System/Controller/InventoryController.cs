using ManagementSystem.Dtos.Inventory;
using ManagementSystem.Core.IConfiguration;
using ManagementSystem.Models;
using ManagementSystem.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using Mapster;
using MapsterMapper;

namespace ManagementSystem.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAuthService _authService;
        private readonly ILogger<InventoryController> _logger;
        private readonly IMapper _mapper;

        public InventoryController(
            IUnitOfWork unitOfWork, 
            IAuthService authService,
            ILogger<InventoryController> logger,
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _authService = authService;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet("GetAll")]
       // [Authorize]
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
       // [Authorize]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var existingInventory = await _unitOfWork.Inventories.GetByIdAsync(id);
                if (existingInventory == null) return NotFound("No Inventory have been found ");
                return Ok(existingInventory);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in getById Inventories");
                return StatusCode(500, ex.Message);
            }

        }

        [HttpPost("Add")]
       // [Authorize]
        public async Task<IActionResult> Add(CreateInventoryRequest model)
        {
            try
            {
                var Inventory = _mapper.Map<Inventory>(model);
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
       // [Authorize]
        public async Task<IActionResult> Update(UpdateInventoryRequest model)
        {
            try
            {
                var existingInventory = await _unitOfWork.Inventories.GetByIdAsync(model.InventoryID);
                if (existingInventory == null) return NotFound("No Inventory have been found ");
                var updatedInventory = _mapper.Map<Inventory>(model);
                await _unitOfWork.Inventories.UpdateAsync(updatedInventory);
                await _unitOfWork.CompleteAsync();
                return Ok("Inventory was updated");
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in update Inventory");
                return StatusCode(500, ex.Message);
            }
        }  
        
        [HttpPut("ActiveInventory{id}")]
       // [Authorize]
        public async Task<IActionResult> ActiveInventory(int id)
        {
            try
            {
                var existingInventory = await _unitOfWork.Inventories.GetByIdAsync(id);
                if (existingInventory == null) return NotFound("No Inventory have been found ");
                existingInventory.IsActive = true;
                await _unitOfWork.Inventories.UpdateAsync(existingInventory);
                await _unitOfWork.CompleteAsync();
                return Ok("Inventory was actived");
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in active Inventory");
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPut("DeactiveInventory{id}")]
       // [Authorize]
        public async Task<IActionResult> DeactiveInventory(int id)
        {
            try
            {
                var existingInventory = await _unitOfWork.Inventories.GetByIdAsync(id);
                if (existingInventory == null) return NotFound("No Inventory have been found ");
                existingInventory.IsActive = false;
                await _unitOfWork.Inventories.UpdateAsync(existingInventory);
                await _unitOfWork.CompleteAsync();
                return Ok("Inventory was Deactived");
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in deactive Inventory");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("Delete{id}")]
      //  [Authorize]
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
