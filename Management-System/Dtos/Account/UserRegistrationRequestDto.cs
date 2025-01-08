using System.ComponentModel.DataAnnotations;

namespace ManagementSystem.Dtos.Account;
public class UserRegistrationRequestDto
{
    [Required]
    public string UserName { get; set; }

    public string Password { get; set; }

    [Required]
    public string Role { get; set; }
}
