﻿using ManagementSystem.Core.IConfiguration;
using ManagementSystem.Models;
using ManagementSystem.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ManagementSystem.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class FactoryController(IUnitOfWork unitOfWork, IAuthService authService) : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork = unitOfWork;
        private readonly IAuthService _authService = authService;


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Factory>>> GetAll()
        {
            var factories = await _unitOfWork.Factories.GetAllAsync();
            return Ok(factories);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Factory>> GetById(int id)
        {
            var factory = await _unitOfWork.Factories.GetByIdAsync(id);
            if (factory is null)
            {
                return NotFound();
            }

            return Ok(factory);
        }

        [HttpPost]
        public async Task<ActionResult<Factory>> Add([FromBody] Factory factory)
        {
            var user = await _authService.GetUser(User);
            if (user == null) return Unauthorized("User couldn't be found");

            await _unitOfWork.Factories.AddAsync(factory);
            await _unitOfWork.CompleteAsync();

            return CreatedAtAction(nameof(GetById), new { id = factory.FactoryID }, factory);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Factory factory)
        {
            var user = await _authService.GetUser(User);
            if (user is null) return Unauthorized("User couldn't be found");

            if (id != factory.FactoryID)
            {
                return BadRequest();
            }

            var existingFactory = await _unitOfWork.Factories.GetByIdAsync(id);
            if (existingFactory is null)
            {
                return NotFound();
            }

            existingFactory.Name = factory.Name;
            existingFactory.IsActive = factory.IsActive;

            _unitOfWork.Factories.Update(existingFactory);
            await _unitOfWork.CompleteAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _authService.GetUser(User);
            if (user is null) return Unauthorized("User couldn't be found");

            var factory = await _unitOfWork.Factories.GetByIdAsync(id);
            if (factory is null)
            {
                return NotFound();
            }

            await _unitOfWork.Factories.DeleteAsync(id);
            await _unitOfWork.CompleteAsync();

            return NoContent();
        }
    }
}
