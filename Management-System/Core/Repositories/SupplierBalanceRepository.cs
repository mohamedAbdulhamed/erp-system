using ManagementSystem.Core.IRepositories;
using ManagementSystem.Data;
using ManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace ManagementSystem.Core.Repositories
{
    public class SupplierBalanceRepository : GenericRepository<SupplierBalance>, ISupplierBalanceRepository
    {
        public SupplierBalanceRepository(AppDbContext appDbContext, ILogger logger) : base(appDbContext, logger) { }

        public async Task<bool> ProcessAddTransaction(SupplierOrderTransaction transaction)
        {
            try
            {

                var supplierBalance = await _context.SupplierBalances.FirstOrDefaultAsync(sp => sp.SupplierID == transaction.SupplierID);
                if (supplierBalance == null) throw new Exception("Supplier or balance not found.");
                switch (transaction.TransactionType)
                {

                    case SupplierTransactionType.Addition:
                        supplierBalance.TotalCredit += transaction.Amount;
                        break;

                    case SupplierTransactionType.Discount:
                        supplierBalance.TotalDiscount += transaction.Amount;
                        break;

                    default:
                        throw new InvalidOperationException("Invalid transaction type.");
                }

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, "Error in ProcessAddTransaction in SupplierBalanceRepository");
                return false;
            }
        }

        public async Task<bool> ProcessDeleteTransaction(SupplierOrderTransaction transaction)
        {
            try
            {
                var supplierBalance = await _context.SupplierBalances.FirstOrDefaultAsync(sp => sp.SupplierID == transaction.SupplierID);
                if (supplierBalance == null) throw new Exception("Supplier or balance not found.");
                switch (transaction.TransactionType)
                {

                    case SupplierTransactionType.Addition:
                        supplierBalance.TotalCredit -= transaction.Amount;
                        break;

                    case SupplierTransactionType.Discount:
                        supplierBalance.TotalDiscount -= transaction.Amount;
                        break;

                    default:
                        throw new InvalidOperationException("Invalid transaction type.");
                }

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, "Error in ProcessDeleteTransaction in SupplierBalanceRepository");
                return false;

            }
        }

        public async Task<bool> ProcessUpdateTransaction(SupplierOrderTransaction oldTransaction, SupplierOrderTransaction newTransaction)
        {
            try
            {
                var supplierBalance = await _context.SupplierBalances.FirstOrDefaultAsync(sp => sp.SupplierID == oldTransaction.SupplierID);
                if (supplierBalance == null) throw new Exception("Supplier or balance not found.");
                await ProcessDeleteTransaction(oldTransaction);
                await ProcessAddTransaction(newTransaction);
                return true;

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, "Error in ProcessUpdateTransaction in SupplierBalanceRepository");
                return false;

            }
        }
    }
}
