using ManagementSystem.Models;
using System.ComponentModel.DataAnnotations;

namespace ManagementSystem.Models
{
    public class SupplierOrderTransaction
    {
        [Key]
        public int TransactionID { get; set; }
        public string Description { get; set; } = string.Empty;
        public SupplierTransactionType TransactionType { get; set; }
        public decimal Amount { get; set; } // Amount of money in the transaction 
        public DateTime TransactionDate { get; set; } 

        public int SupplierID { get; set; } 
        public virtual Supplier Supplier { get; set; }
    }

    public enum SupplierTransactionType
    {
        Payment,
        Discount,
    }
}
