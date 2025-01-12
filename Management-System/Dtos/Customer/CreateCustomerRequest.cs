namespace ManagementSystem.Dtos.Customer
{
    public class CreateCustomerRequest
    {
        public required string CustomerName { get; set; }
        public required string PhoneNumber { get; set; }
        public string? Address { get; set; }
    }
}
