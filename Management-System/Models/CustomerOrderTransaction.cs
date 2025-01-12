using ManagementSystem.Models;
using System.ComponentModel.DataAnnotations;

namespace ManagementSystem.Models
{
    public class CustomerOrderTransaction
    {
        [Key]
        public int TransactionID { get; set; }
        public string Description { get; set; } = string.Empty;
        public CustomerTransactionType TransactionType { get; set; }
        public decimal Amount { get; set; } // Amount of money in the transaction 
        public DateTime TransactionDate { get; set; }

        public int CustomerID { get; set; }
        public virtual Customer Customer { get; set; }
    }
    
    public enum CustomerTransactionType
    {
        Payment,
        Discount,
    }   
}
