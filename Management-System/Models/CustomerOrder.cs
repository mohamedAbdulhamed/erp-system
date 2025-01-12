namespace ManagementSystem.Models
{
    public class CustomerOrder
    {
        public int CustomerOrderID { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime OrderDate { get; set; }
        public CustomerOrderSource OrderType { get; set; }
        public CustomerOrderStatues OrderStatues { get; set; }
        public CustomerOrderType CustomerOrderType { get; set; }
        public int CustumerID { get; set; }
        public virtual Customer Custumer { get; set; }

        public virtual ICollection<CustomerOrderDetail> CustomerOrderDetails { get; set; } =new List<CustomerOrderDetail>();

    }

    public enum CustomerOrderSource
    {
        Online,
        Galary
    } 
    public enum CustomerOrderStatues
    {
        Pending,
        Shipped,
        Completed
    }
    public enum CustomerOrderType
    {
        Selling,
        Refund
    }

   
}
