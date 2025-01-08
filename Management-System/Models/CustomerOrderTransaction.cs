using ManagementSystem.Models;
using System.ComponentModel.DataAnnotations;

namespace ManagementSystem.Models
{
    public class CustomerOrderTransaction
    {
        [Key]
        public int TransactionID { get; set; }
        public string Description { get; set; } = string.Empty;
        public int OrderID { get; set; } 
        public virtual CustomerOrder CustomerOrder { get; set; } 
        public decimal Amount { get; set; } // Amount of money in the transaction 
        public DateTime TransactionDate { get; set; }
    }
    
       
}
