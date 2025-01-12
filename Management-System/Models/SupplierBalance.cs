using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ManagementSystem.Models
{
    public class SupplierBalance
    {
        [Key]
        public int SupplierID { get; set; } // Foreign key to Customer
        //public int CustomerBalanceID { get; set; }

        public decimal TotalCredit { get; set; } = 0; // Total credit amount for the customer
        public decimal TotalDebit { get; set; } = 0; // Total debit amount for the customer
        public decimal TotalDiscount { get; set; } = 0; // Total Discount amount for the customer
        public decimal TotalReturn { get; set; } = 0; // Total Return amount for the customer
        [NotMapped]
        public decimal CurrentBalance => TotalDebit - TotalCredit - TotalDiscount - TotalReturn;


        //public int  SupplierID { get; set; } // Foreign key to  Supplier
        public virtual Supplier Supplier { get; set; }
    }
}
