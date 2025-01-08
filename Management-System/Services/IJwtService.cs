using ManagementSystem.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace ManagementSystem.Services;

public interface IJwtService
{
    Task<List<Claim>> GetAuthClaims(User user);
    JwtSecurityToken GetToken(List<Claim> authClaims);
    string GenerateRefreshToken();
    ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
}
