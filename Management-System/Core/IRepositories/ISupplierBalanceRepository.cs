using ManagementSystem.Models;

namespace ManagementSystem.Core.IRepositories
{
    public interface ISupplierBalanceRepository : IGenericRepository<SupplierBalance>
    {

        public Task<bool> ProcessAddTransaction(SupplierOrderTransaction transaction);
        public Task<bool> ProcessDeleteTransaction(SupplierOrderTransaction transaction);
        public Task<bool> ProcessUpdateTransaction(SupplierOrderTransaction oldTransaction, SupplierOrderTransaction newTransaction);

    }
}
