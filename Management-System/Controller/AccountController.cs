using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ManagementSystem.Core.IConfiguration;
using ManagementSystem.Dtos.Account;
using ManagementSystem.Models;
using ManagementSystem.Services;
using System.IdentityModel.Tokens.Jwt;

namespace Shipping.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController(
         UserManager<User> userManager,
         RoleManager<IdentityRole> roleManager,
         IUnitOfWork unitOfWork,
         ILogger<AccountController> logger,
         IJwtService jwtService,
         IAuthService authService,
         IConfiguration configuration) : ControllerBase
    {
        private readonly UserManager<User> _userManager = userManager;
        private readonly RoleManager<IdentityRole> _roleManager = roleManager;
        private readonly IUnitOfWork _unitOfWork = unitOfWork;
        private readonly ILogger<AccountController> _logger = logger;
        private readonly IJwtService _jwtService = jwtService;
        private readonly IAuthService _authService = authService;
        private readonly IConfiguration _configuration = configuration;


        [HttpGet("GetRoles")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetRoles()
        {
            try
            {
                var roles = await _roleManager.Roles.ToListAsync();

                if (roles is not null) return Ok(roles);

                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while getting roles");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationRequestDto model)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest("Invalid model state.");

                var existingUserByUsername = await _userManager.FindByNameAsync(model.UserName);
                if (existingUserByUsername is not null) return BadRequest("Username already exists.");

                var user = new User
                {
                    UserName = model.UserName,
                };

                var result = await _userManager.CreateAsync(user, model.Password);

                if (!result.Succeeded) return BadRequest(string.Join(", ", result.Errors.Select(e => e.Description)));

                if (!await _roleManager.RoleExistsAsync(model.Role)) return BadRequest("Role does not exist.");

                var roleResult = await _userManager.AddToRoleAsync(user, model.Role);

                if (!roleResult.Succeeded) return BadRequest(string.Join(", ", roleResult.Errors.Select(e => e.Description)));

                return Ok("User created and role assigned successfully!");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while logging out");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginRequestDto model)
            {
            try
            {
                if (!ModelState.IsValid) return BadRequest("Invalid model state.");

                var user = await _userManager.FindByNameAsync(model.Username);

                if (user is not null)
                {
                    var isLockedOut = await _userManager.IsLockedOutAsync(user);

                    if (isLockedOut) return Unauthorized("User is locked out, please try again later or try resetting the password!");

                    var isCorrect = await _userManager.CheckPasswordAsync(user, model.Password);

                    if (!isCorrect)
                    {
                        await _userManager.AccessFailedAsync(user);

                        var userLockedOutState = await _userManager.IsLockedOutAsync(user);

                        if (userLockedOutState) return Unauthorized("User is locked out, please try again later or try resetting the password!");

                        return Unauthorized("Invalid Credentials.");
                    }

                    await _userManager.ResetAccessFailedCountAsync(user);

                    var authClaims = await _jwtService.GetAuthClaims(user);

                    var token = _jwtService.GetToken(authClaims);

                    var newRefreshToken = _jwtService.GenerateRefreshToken();

                    user.RefreshToken = newRefreshToken;

                    user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);

                    await _userManager.UpdateAsync(user);

                    var roles = await _userManager.GetRolesAsync(user);
                    var role = roles.FirstOrDefault();

                    var userDto = new
                    {
                        username = user.UserName,
                        role = role,
                    };

                    var refreshTokenCookieOptions = new CookieOptions
                    {
                        HttpOnly = true,
                        Expires = DateTime.Now.AddDays(7),
                        SameSite = SameSiteMode.None,
                        Secure = true
                    };

                    Response.Cookies.Append("refreshToken", newRefreshToken, refreshTokenCookieOptions);

                    return Ok(new
                    {
                        Token = new JwtSecurityTokenHandler().WriteToken(token),
                        User = userDto
                    });
                }

                return Unauthorized("Invalid Credentials.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while logging out");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpGet("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            try
            {
                var cookievalue = Request.Cookies["refreshToken"];

                if (string.IsNullOrEmpty(cookievalue)) return BadRequest("Invalid request, Cookie not found!");

                var user = await _userManager.Users.SingleOrDefaultAsync(u => u.RefreshToken == cookievalue);

                if (user is null) return BadRequest("Invalid refresh token");

                if (user.RefreshTokenExpiryTime <= DateTime.Now) return BadRequest("Expired refresh token");

                var refreshTokenExpiryDays = _configuration.GetValue<int>("Jwt:RefreshTokenExpiryDays");

                var newToken = _jwtService.GetToken(await _jwtService.GetAuthClaims(user));
                user.RefreshToken = _jwtService.GenerateRefreshToken();
                user.RefreshTokenExpiryTime = DateTime.Now.AddDays(refreshTokenExpiryDays);

                await _userManager.UpdateAsync(user);

                var refreshTokenCookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Expires = DateTime.Now.AddDays(refreshTokenExpiryDays),
                    SameSite = SameSiteMode.None,
                    Secure = true
                };

                Response.Cookies.Append("refreshToken", user.RefreshToken, refreshTokenCookieOptions);

                var roles = await _userManager.GetRolesAsync(user);
                var role = roles.FirstOrDefault();

                var userDto = new
                {
                    username = user.UserName,
                    role = role
                };

                return Ok(new
                {
                    Token = new JwtSecurityTokenHandler().WriteToken(newToken),
                    User = userDto
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while getting roles");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("logout")]
        [Authorize()]
        public async Task<IActionResult> Logout()
        {
            try
            {
                var user = await _authService.GetUser(User);

                if (user is null) return Unauthorized("User could't be found.");

                user.RefreshToken = null;
                await _userManager.UpdateAsync(user);

                Response.Cookies.Delete("refreshToken");

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while logging out");
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpPost("add-role")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddRole([FromBody] string role)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(role))
                {
                    return BadRequest("Role name cannot be empty.");
                }

                if (await _roleManager.RoleExistsAsync(role))
                {
                    return BadRequest("Role already exists.");
                }

                var result = await _roleManager.CreateAsync(new IdentityRole(role));

                if (result.Succeeded) return Ok("Role has been added");


                return BadRequest(string.Join(", ", result.Errors.Select(e => e.Description)));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while getting roles");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpPut("UpdatePassword")]
        [Authorize]
        public async Task<IActionResult> UpdatePassword([FromBody] ChangePasswordRequestDto model)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest("Invalid model state.");

                var user = await _authService.GetUser(User);

                if (user is null) return Unauthorized("User could't be found.");

                var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

                if (!result.Succeeded) return BadRequest(string.Join(", ", result.Errors.Select(e => e.Description)));

                return Ok("Password changed successfully!");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating user password");
                return StatusCode(500, "Internal server error");
            }

        }

        [HttpDelete("DeleteUser/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            try
            {
                var currentUser = await _authService.GetUser(User);

                if (currentUser is null) return StatusCode(500, "Couldn't identify the current user!");

                if (currentUser.Id == id) return BadRequest("You can't delete yourself.");

                var user = await _userManager.Users
                    .Where(u => u.Id == id)
                    .SingleOrDefaultAsync();

                if (user is null) return NotFound("User not found.");

                var result = await _userManager.DeleteAsync(user);

                if (result.Succeeded)
                {
                    return Ok("User deleted successfully.");
                }

                return BadRequest(string.Join(", ", result.Errors.Select(e => e.Description)));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting the user");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
