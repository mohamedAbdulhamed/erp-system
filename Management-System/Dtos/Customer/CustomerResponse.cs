using ManagementSystem.Models ;

namespace ManagementSystem.Dtos.Customer
{
    public class CustomerResponse
    {
        public required string CustomerName { get; set; }
        public required string PhoneNumber { get; set; }
        public bool IsActive { get; set; } = true;

        // Navigation Properties
        public virtual ICollection<ManagementSystem.Models.CustomerOrderTransaction> CustomerOrderTransactions { get; set; } = new List<ManagementSystem.Models.CustomerOrderTransaction>();

    }
}
