namespace ManagementSystem.Models
{
    public class CustomerOrderDetail
    {
        public int CustomerOrderDetailID { get; set; }
        public int CustomerOrderID { get; set; }
        public virtual CustomerOrder CustomerOrder { get; set; }
        public int ProductID { get; set; }
        public virtual Product Product { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; } // Price per unit at the time of billing
        public decimal ProductTotalPrice => Quantity * UnitPrice ;
    }

}
