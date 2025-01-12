using ManagementSystem.Models ;

namespace ManagementSystem.Dtos.Customer
{
    public class CustomerResponse
    {
        public required string CustomerName { get; set; }
        public required string PhoneNumber { get; set; }
        public bool IsActive { get; set; } = true;
        public CustomerType CustomerType { get; set; } 

        // Navigation Properties


    }
}
