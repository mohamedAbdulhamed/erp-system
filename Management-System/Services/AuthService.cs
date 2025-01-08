using ManagementSystem.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;

namespace ManagementSystem.Services;


public class AuthService(UserManager<User> userManager, IConfiguration configuration) : IAuthService
{
    private readonly UserManager<User> _userManager = userManager;
    private readonly IConfiguration _configuration = configuration;

    public async Task<User?> GetUser(ClaimsPrincipal userClaimsPrincipal)
    {
        var userIdentifier = userClaimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(userIdentifier)) return null;

        return await _userManager.FindByNameAsync(userIdentifier);
    }

    public async Task<IList<Claim>?> GetUserClaims(ClaimsPrincipal userClaimsPrincipal)
    {
        var user = await GetUser(userClaimsPrincipal);

        if (user is null) return null;

        return await _userManager.GetClaimsAsync(user);
    }

    public async Task<bool> HasClaim(ClaimsPrincipal userClaimsPrincipal, string type, string value)
    {
        var userClaims = await GetUserClaims(userClaimsPrincipal);

        if (userClaims is null || !userClaims.Any()) return false;

        bool hasClaim = false;
        foreach(Claim userClaim in userClaims)
        {
            if (userClaim.Type == type)
            {
                if (userClaim.Value == value)
                {
                    hasClaim = true;
                }
            }
        }

        return hasClaim;
    }
}