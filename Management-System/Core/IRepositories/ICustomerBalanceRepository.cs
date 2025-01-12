using ManagementSystem.Models;

namespace ManagementSystem.Core.IRepositories
{
    public interface ICustomerBalanceRepository : IGenericRepository<CustomerBalance>
    {
        public Task<bool> ProcessAddTransaction(CustomerOrderTransaction transaction);
        public Task<bool> ProcessDeleteTransaction(CustomerOrderTransaction transaction);
        public Task<bool> ProcessUpdateTransaction(CustomerOrderTransaction oldTransaction,CustomerOrderTransaction newTransaction);
    }
}
