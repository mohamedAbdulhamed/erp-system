﻿namespace ManagementSystem.Dtos.Account
{
    public class ChangePasswordRequestDto
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
