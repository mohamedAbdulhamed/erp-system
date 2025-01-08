using System.Transactions;

namespace ManagementSystem.Models
{
    public class CustomerOrder
    {
        public int CustomerOrderID { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime OrderDate { get; set; }

        public OrderType OrderType { get; set; }
        public CustumerPaymentType CustumerPaymentType { get; set; }

        public int CustumerID { get; set; }
        public virtual Customer Custumer { get; set; }

        public virtual ICollection<CustomerOrderDetail> CustomerOrderDetails { get; set; }
        public virtual ICollection<CustomerOrderTransaction> CustomerOrderTransactions { get; set; }
    }

    public enum OrderType
    {
        Online,
        Local
    }
    public enum CustumerPaymentType
    {
        Cash,
        Depit
    }
}
