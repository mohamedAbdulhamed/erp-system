using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace ManagementSystem.Models
{
    public class User :IdentityUser
    {
        [Required]
        public override required string UserName { get; set; }
        public string? ProfilePicture { get; set; }
        public string? Address { get; set; }

        public string? RefreshToken { get; set; }

        public DateTime RefreshTokenExpiryTime { get; set; }

        

    }
}
