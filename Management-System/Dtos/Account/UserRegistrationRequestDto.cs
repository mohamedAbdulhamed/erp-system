using System.ComponentModel.DataAnnotations;

namespace ManagementSystem.Dtos.Account;
public class UserRegistrationRequestDto
{
    [Required]
    public required string UserName { get; set; }
    [Required]
    public required string Password { get; set; }

    [Required]
    public required string Role { get; set; }
}
