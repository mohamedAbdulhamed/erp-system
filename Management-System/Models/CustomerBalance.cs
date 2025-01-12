using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ManagementSystem.Models
{
    public class CustomerBalance
    {
        [Key]
        public int CustomerID { get; set; } // Foreign key to Customer
        public decimal TotalCredit { get; set; } = 0 ; // Total credit amount for the customer
        public decimal TotalDebit { get; set; } = 0 ; // Total debit amount for the customer
        public decimal TotalDiscount { get; set; } = 0; // Total Discount amount for the customer
        public decimal TotalReturn { get; set; } = 0; // Total Return amount for the customer
        [NotMapped]
        public decimal CurrentBalance => TotalCredit - TotalDebit + TotalDiscount + TotalReturn;
        public virtual Customer Customer { get; set; }
    }
}    
