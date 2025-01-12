namespace ManagementSystem.Dtos.Customer
{
    public class UpdateCustomerRequest
    {
        public int CustomerID { get; set; }
        public string CustomerName { get; set; }
        public string PhoneNumber { get; set; }
    }
}
