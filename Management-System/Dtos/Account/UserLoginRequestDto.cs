using System.ComponentModel.DataAnnotations;

namespace ManagementSystem.Dtos.Account;

public class UserLoginRequestDto
{
    [Required]
    public required string Username { get; set; }

    [Required]
    public required string Password { get; set; }
}
