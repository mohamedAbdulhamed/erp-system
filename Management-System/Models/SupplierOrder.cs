using System.Transactions;

namespace ManagementSystem.Models
{
    public class SupplierOrder
    {
        public int SupplierOrderID { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime OrderDate { get; set; } 
        public OrderType OrderType { get; set; } 
        public SupplierPaymentType SupplierPaymentType { get; set; }

        public int SupplierID { get; set; }
        public virtual Supplier Supplier { get; set; }

        public virtual ICollection<SupplierOrderDetail> SupplierOrderDetails { get; set; }
    }

    public enum SupplierPaymentType
    {
        Cash,
        Depit
    }

}
