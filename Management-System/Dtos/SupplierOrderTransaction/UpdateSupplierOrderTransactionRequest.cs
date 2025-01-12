using ManagementSystem.Models;

namespace ManagementSystem.Dtos.SupplierOrderTransaction
{
    public class UpdateSupplierOrderTransactionRequest
    {
        public int TransactionID { get; set; }
        public string Description { get; set; } = string.Empty;
        public SupplierTransactionType TransactionType { get; set; }
        public decimal Amount { get; set; } // Amount of money in the transaction 
        public DateTime TransactionDate { get; set; }

        public int SupplierID { get; set; }
    }
}
