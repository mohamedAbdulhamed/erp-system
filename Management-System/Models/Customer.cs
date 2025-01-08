namespace ManagementSystem.Models
{
    public class Customer
    {
        public int CustomerID { get; set; }
        public string CustomerName { get; set; }
        public string ContactNumber { get; set; }
        public string? Address { get; set; }
        public bool IsActive { get; set; } = true ;
        public virtual ICollection<CustomerOrder> Orders { get; set; } = new List<CustomerOrder>();
    }
}
