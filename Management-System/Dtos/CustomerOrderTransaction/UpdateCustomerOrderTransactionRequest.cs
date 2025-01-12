using ManagementSystem.Models;

namespace ManagementSystem.Dtos.CustomerOrderTransaction
{
    public class UpdateCustomerOrderTransactionRequest
    {
        public int TransactionID { get; set; }
        public string Description { get; set; } = string.Empty;
        public CustomerTransactionType TransactionType { get; set; }
        public decimal Amount { get; set; } // Amount of money in the transaction 
        public DateTime TransactionDate { get; set; }

        public int CustomerID { get; set; }
    }
}
