﻿namespace ManagementSystem.Dtos.Customer
{
    public class CreateCustomerRequest
    {
        public string CustomerName { get; set; }
        public string PhoneNumber { get; set; }
        public string? Address { get; set; }
    }
}
