using ManagementSystem.Core.IRepositories;
using ManagementSystem.Data;
using ManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace ManagementSystem.Core.Repositories
{
    public class CustomerBalanceRepository:GenericRepository<CustomerBalance> , ICustomerBalanceRepository
    {
        public CustomerBalanceRepository(AppDbContext appDbContext , ILogger logger) : base(appDbContext , logger) { }

        public async Task<bool> ProcessAddTransaction(CustomerOrderTransaction transaction)
        {
            try
            {
                var customerBalance = await _context.CustomerBalances.FirstOrDefaultAsync(cb => cb.CustomerID == transaction.CustomerID);
                if (customerBalance == null) throw new Exception("Customer or balance not found.");
                switch (transaction.TransactionType)
                {
                    case CustomerTransactionType.Addition:
                        customerBalance.TotalCredit += transaction.Amount;
                        //safe.TotalAmount += transaction.Amount;
                        break;

                    case CustomerTransactionType.Discount:
                        customerBalance.TotalDiscount += transaction.Amount;
                        //safe.TotalAmount -= transaction.Amount;
                        break;
            
                    default:
                        throw new InvalidOperationException("Invalid transaction type.");
                }
                //await _context.SaveChangesAsync();
                return  true;


            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message,"Error in ProcessAddTransaction in CustomerBalanceRepository");
                return false;
            }
        }
        
        public async Task<bool> ProcessDeleteTransaction(CustomerOrderTransaction transaction)
        {
            try
            {
                var customerBalance = await _context.CustomerBalances.FirstOrDefaultAsync(cb => cb.CustomerID == transaction.CustomerID);
                if (customerBalance == null) throw new Exception("Customer or Customer Balance not found.");
                switch (transaction.TransactionType)
                {
                    case CustomerTransactionType.Addition:
                        customerBalance.TotalCredit -= transaction.Amount;
                        //safe.TotalAmount -= transaction.Amount;
                        break;

                    case CustomerTransactionType.Discount:
                        customerBalance.TotalDiscount -= transaction.Amount;
                        //safe.TotalAmount += transaction.Amount;
                        break;


                    default:
                        throw new InvalidOperationException("Invalid transaction type.");
                }
                //await _context.SaveChangesAsync();
                return true;


            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message,"Error in ProcessDeleteTransaction in CustomerBalanceRepository");
                return false;
            }
        }
             public async Task<bool> ProcessUpdateTransaction(CustomerOrderTransaction oldTransaction,CustomerOrderTransaction newTransaction)
        {
            try
            {
                var customerBalance = await _context.CustomerBalances.FirstOrDefaultAsync(cb => cb.CustomerID == oldTransaction.CustomerID);
                if (customerBalance == null) throw new Exception("Customer or Customer Balance not found.");
                await ProcessDeleteTransaction(oldTransaction);
                await ProcessAddTransaction(newTransaction);
                return true;


            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message,"Error in ProcessUpdateTransaction in CustomerBalanceRepository");
                return false;
            }
        }


    }
}
