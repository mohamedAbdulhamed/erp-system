using System.ComponentModel.DataAnnotations;

namespace ManagementSystem.Models
{
    public class SupplierOrder
    {
        [Key]
        public int SupplierOrderID { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime OrderDate { get; set; } 
        public CustomerOrderSource OrderType { get; set; } 
        public SupplierOrderType SupplierOrderType { get; set; }

        public int SupplierID { get; set; }
        public virtual Supplier Supplier { get; set; }

        public virtual ICollection<SupplierOrderDetail> SupplierOrderDetails { get; set; }
    }

    public enum SupplierOrderType
    {
        Purchase,
        Refund
    }

}
