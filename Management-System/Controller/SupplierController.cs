using ManagementSystem.Dtos.Supplier;
using ManagementSystem.Core.IConfiguration;
using ManagementSystem.Models;
using ManagementSystem.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MapsterMapper;
using Mapster;
using System.Net;

namespace ManagementSystem.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAuthService _authService;
        private readonly ILogger<SupplierController> _logger;
        private readonly IMapper _mapper;
        public SupplierController(IUnitOfWork unitOfWork ,IAuthService authService ,ILogger<SupplierController> logger,IMapper mapper)
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
                var suppliers = await _unitOfWork.Suppliers.FindAllAsync(s=>s.IsActive==true);
                return Ok(suppliers);

            }
            catch (Exception ex) 
            {
                _logger.LogError(ex.Message, "Error in GetAll supplier contoller");
                return StatusCode(500,ex.Message);
            }

        }

        [HttpGet("GetById{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var supplier = await _unitOfWork.Suppliers.GetByIdAsync(id);
                if (supplier == null) return NotFound($"supplier with {id} not found");
                return Ok(supplier);

            }
            catch (Exception ex) 
            {
                _logger.LogError(ex.Message, "Error in GetById supplier contoller");
                return StatusCode(500, ex.Message);
            }

        }

        [HttpPost("Add")]
        //[Authorize]
        public async Task<IActionResult> Add(CreateSupplierRequest model)
        {
            try
            {
                var supplier = _mapper.Map<Supplier>(model);
                if (supplier == null) return BadRequest();
                await _unitOfWork.Suppliers.AddAsync(supplier);
                await _unitOfWork.CompleteAsync();
                var addedSupplier= await _unitOfWork.Suppliers.FindAsync(c => c.PhoneNumber.Contains(model.PhoneNumber));
                if (addedSupplier == null) return BadRequest("Supplier wasn't added");
                var supplierBalance = new SupplierBalance { SupplierID = addedSupplier.SupplierID };
                await _unitOfWork.SupplierBalances.AddAsync(supplierBalance);
                await _unitOfWork.CompleteAsync();
                return Ok("Supplier was added");

            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message, "Error in add supplier contoller");
                return StatusCode(500, ex.Message);
            }
        }



        [HttpPut("Update")]
        public async Task<IActionResult> Update(UpdateSupplierRequest model)
        {
            try
            {
                var supplier = await _unitOfWork.Suppliers.GetByIdAsync(model.SupplierId);
                if (supplier == null) return BadRequest("Supplier Couldn't be found");
                supplier.SupplierName = model.SupplierName;
                supplier.PhoneNumber = model.phoneNumber;
                await _unitOfWork.Suppliers.UpdateAsync(supplier);
                await _unitOfWork.CompleteAsync();
                return Ok("Supplier was Updted successfully");
            }
            catch (Exception ex) 
            {
                _logger.LogError(ex.Message, "Error in ActiveSupplier supplier contoller");
                return StatusCode(500, ex.Message);
            }

        }  
        
        [HttpPut("ActiveSupplier{id}")]
        public async Task<IActionResult> ActiveSupplier(int id)
        {
            try
            {
                var supplier = await _unitOfWork.Suppliers.GetByIdAsync(id);
                if (supplier == null) return BadRequest("Supplier Couldn't be found");
                if (supplier.IsActive == true) return BadRequest("Supplier already active");
                supplier.IsActive = true;
                await _unitOfWork.Suppliers.UpdateAsync(supplier);
                await _unitOfWork.CompleteAsync();
                return Ok("Supplier Active successfully");
            }
            catch (Exception ex) 
            {
                _logger.LogError(ex.Message, "Error in ActiveSupplier supplier contoller");
                return StatusCode(500, ex.Message);
            }

        }

        [HttpPut("DeactiveSupplier{id}")]
        public async Task<IActionResult> DeactiveSupplier(int id)
        {
            try
            {
                var supplier = await _unitOfWork.Suppliers.GetByIdAsync(id);
                if (supplier == null) return BadRequest("Supplier Couldn't be found");
                if (supplier.IsActive == false) return BadRequest("Supplier already not active");
                supplier.IsActive = false;
                await _unitOfWork.Suppliers.UpdateAsync(supplier);
                await _unitOfWork.CompleteAsync();
                return Ok("Supplier Deactive successfully");

            }
            catch (Exception ex) 
            {
                _logger.LogError(ex.Message, "Error in DeactiveSupplier supplier contoller");
                return StatusCode(500, ex.Message);
            }
        

        }  
        
        [HttpDelete("Delete{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var supplier = await _unitOfWork.Suppliers.GetByIdAsync(id);
                if (supplier == null) return BadRequest("Supplier Couldn't be found");
                await _unitOfWork.Suppliers.DeleteAsync(id);
                await _unitOfWork.CompleteAsync();
                return Ok("Supplier was Deleted successfully");

            }
            catch (Exception ex) 
            {
                _logger.LogError(ex.Message, "Error in Delete supplier contoller");
                return StatusCode(500, ex.Message);
            }
        

        }

    }
}
