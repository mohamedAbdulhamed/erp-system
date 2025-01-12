using ManagementSystem.Models;

namespace ManagementSystem.Models
{
    public class Customer
    {
        public int CustomerID { get; set; }
        public required string CustomerName { get; set; }
        public string? Address { get; set; }
        public required string PhoneNumber { get; set; }
        public bool IsActive { get; set; } = true ;
        
        // Navigation Properties
        public virtual CustomerBalance CustomerBalance { get; set; }
        public virtual ICollection<CustomerOrder> CustomerOrders { get; set; } = new List<CustomerOrder>();
        public virtual ICollection<CustomerOrderTransaction> CustomerOrderTransactions { get; set; } = new List<CustomerOrderTransaction>();
    }
}
