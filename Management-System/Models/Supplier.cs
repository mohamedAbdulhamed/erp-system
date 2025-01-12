using System.ComponentModel.DataAnnotations;

namespace ManagementSystem.Models
{
    public class Supplier
    {
        [Key]
        public int SupplierID { get; set; }
        public required string SupplierName { get; set; }
        public required string PhoneNumber { get; set; }
        public bool IsActive { get; set; } = true;
        public virtual SupplierBalance SupplierBalance { get; set; }
        public virtual ICollection<Product> Products { get; set; } = new List<Product>();
        public virtual ICollection<SupplierOrder> SuppliersOrder { get; set; } = new List<SupplierOrder>();
        public virtual ICollection<SupplierOrderTransaction> SupplierOrderTransactions { get; set; } = new List<SupplierOrderTransaction>();

    }
}
