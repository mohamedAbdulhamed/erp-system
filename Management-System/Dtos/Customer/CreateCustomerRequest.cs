namespace Management_System.Dtos.Customer
{
    public class CreateCustomerRequest
    {
        public string CustomerName { get; set; }
        public string ContactNumber { get; set; }
        public string? Address { get; set; }
    }
}
