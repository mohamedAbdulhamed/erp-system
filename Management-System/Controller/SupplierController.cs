using Management_System.Dtos.Supplier;
using ManagementSystem.Core.IConfiguration;
using ManagementSystem.Models;
using ManagementSystem.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Management_System.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAuthService _authService;
        public SupplierController(IUnitOfWork unitOfWork ,IAuthService authService)
        {
            _unitOfWork = unitOfWork;
            _authService = authService;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var suppliers = await _unitOfWork.Suppliers.GetAllAsync();
            return Ok(suppliers);
        }

        [HttpGet("GetById{id}")]
        public async Task<IActionResult> GetById(int id)
        {

            var supplier = await _unitOfWork.Suppliers.GetByIdAsync(id);
            return Ok(supplier);

        }

        [HttpPost("Add")]
        //[Authorize]
        public async Task<IActionResult> Add(CreateSupplierRequest model)
        {
            var user = await _authService.GetUser(User);
            //if (user == null) return Unauthorized("User couldn't be found");
            var supplier = new Supplier
            {
                SupplierName = model.SupplierName,
                ContactNumber = model.ContactNumber,
            };
            if (supplier != null)
            {
                await _unitOfWork.Suppliers.AddAsync(supplier);
                await _unitOfWork.CompleteAsync();
                return Ok("Supplier was added");
            }
            return BadRequest();
        }

        [HttpPut("ActiveSupplier{id}")]
        public async Task<IActionResult> ActiveSupplier(int id)
        {
            var supplier = await _unitOfWork.Suppliers.GetByIdAsync(id);
            if (supplier == null) return BadRequest("Supplier Couldn't be found");
            if (supplier.IsActive == true) return BadRequest("Supplier already active");
            supplier.IsActive = true;
            await _unitOfWork.Suppliers.UpdateAsync(supplier);
            await _unitOfWork.CompleteAsync();
            return Ok("Supplier was updated successfully");
        }

        [HttpPut("DeactiveSupplier{id}")]
        public async Task<IActionResult> DeactiveSupplier(int id)
        {
            var supplier = await _unitOfWork.Suppliers.GetByIdAsync(id);
            if (supplier == null) return BadRequest("Supplier Couldn't be found");
            if (supplier.IsActive == false) return BadRequest("Supplier already not active");
            supplier.IsActive = false;
            await _unitOfWork.Suppliers.UpdateAsync(supplier);
            await _unitOfWork.CompleteAsync();
            return Ok("Supplier was updated successfully");
        }

    }
}
