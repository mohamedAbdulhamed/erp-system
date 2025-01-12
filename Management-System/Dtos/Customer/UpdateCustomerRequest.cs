namespace ManagementSystem.Dtos.Customer
{
    public class UpdateCustomerRequest
    {
        public int CustomerID { get; set; }
        public required string CustomerName { get; set; }
        public required string PhoneNumber { get; set; }
    }
}
