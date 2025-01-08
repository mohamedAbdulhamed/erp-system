using System.ComponentModel.DataAnnotations;

namespace ManagementSystem.Dtos.Account;

public class UserLoginRequestDto
{
    [Required]
    public string Username { get; set; }

    [Required]
    public string Password { get; set; }
}
