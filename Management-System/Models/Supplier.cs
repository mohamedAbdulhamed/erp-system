namespace ManagementSystem.Models
{
    public class Supplier
    {
        public int SupplierID { get; set; }
        public string SupplierName { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsActive { get; set; } = true;
        public virtual SupplierBalance SupplierBalance { get; set; }
        public virtual ICollection<Product> Products { get; set; } = new List<Product>();
        public virtual ICollection<SupplierOrder> SuppliersOrder { get; set; } = new List<SupplierOrder>();
        public virtual ICollection<SupplierOrderTransaction> SupplierOrderTransactions { get; set; } = new List<SupplierOrderTransaction>();

    }
}
