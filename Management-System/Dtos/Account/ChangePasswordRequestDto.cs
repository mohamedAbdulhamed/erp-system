namespace ManagementSystem.Dtos.Account
{
    public class ChangePasswordRequestDto
    {
        public required string CurrentPassword { get; set; }
        public required string NewPassword { get; set; }
    }
}
