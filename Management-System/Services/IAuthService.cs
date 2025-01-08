using ManagementSystem.Models;
using System.Security.Claims;

namespace ManagementSystem.Services;

public interface IAuthService
{
    Task<User?> GetUser(ClaimsPrincipal userClaimsPrincipal);
    Task<IList<Claim>?> GetUserClaims(ClaimsPrincipal userClaimsPrincipal);
    Task<bool> HasClaim(ClaimsPrincipal userClaimsPrincipal, string type, string value);
}
