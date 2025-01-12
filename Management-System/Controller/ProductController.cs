using ManagementSystem.Core.IConfiguration;
using ManagementSystem.Models;
using ManagementSystem.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ManagementSystem.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController(IUnitOfWork unitOfWork, IAuthService authService) : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork = unitOfWork;
        private readonly IAuthService _authService = authService;


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetAll()
        {
            var products = await _unitOfWork.Products.GetAllAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetById(int id)
        {
            var product = await _unitOfWork.Products.GetByIdAsync(id);
            if (product is null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> Add([FromBody] Product product)
        {
            var user = await _authService.GetUser(User);
            if (user is null) return Unauthorized("User couldn't be found");

            await _unitOfWork.Products.AddAsync(product);
            await _unitOfWork.CompleteAsync();

            return CreatedAtAction(nameof(GetById), new { id = product.ProductID }, product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Product product)
        {
            var user = await _authService.GetUser(User);
            if (user is null) return Unauthorized("User couldn't be found");

            if (id != product.ProductID)
            {
                return BadRequest();
            }

            var existingProduct = await _unitOfWork.Products.GetByIdAsync(id);
            if (existingProduct is null)
            {
                return NotFound();
            }

            existingProduct.Name = product.Name;
            existingProduct.IsActive = product.IsActive;

            _unitOfWork.Products.Update(existingProduct);
            await _unitOfWork.CompleteAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _authService.GetUser(User);
            if (user is null) return Unauthorized("User couldn't be found");

            var product = await _unitOfWork.Products.GetByIdAsync(id);
            if (product is null)
            {
                return NotFound();
            }

            await _unitOfWork.Products.DeleteAsync(id);
            await _unitOfWork.CompleteAsync();

            return NoContent();
        }
    }
}
