using ManagementSystem.Models;
using System.ComponentModel.DataAnnotations;

namespace ManagementSystem.Models
{
    public class SupplierOrderTransaction
    {
        [Key]
        public int TransactionID { get; set; }
        public string Description { get; set; } = string.Empty;
        public int SupplierOrderID { get; set; } 
        public virtual SupplierOrder SupplierOrder { get; set; } 
        public decimal Amount { get; set; } // Amount of money in the transaction 
        public DateTime TransactionDate { get; set; } = DateTime.Now;
    }
  
       
}
