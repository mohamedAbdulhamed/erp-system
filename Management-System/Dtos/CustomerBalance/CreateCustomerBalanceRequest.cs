namespace ManagementSystem.Dtos.CustomerBalance
{
    public class CreateCustomerBalanceRequest
    {
        public int CustomerID { get; set; } // Foreign key to Customer
        //public int CustomerBalanceID { get; set; }

        public decimal TotalCredit { get; set; } = 0; // Total credit amount for the customer
        public decimal TotalDebit { get; set; } = 0; // Total debit amount for the customer
        public decimal TotalDiscount { get; set; } = 0; // Total Discount amount for the customer
        public decimal TotalReturn { get; set; } = 0; // Total Return amount for the customer
    }
}
