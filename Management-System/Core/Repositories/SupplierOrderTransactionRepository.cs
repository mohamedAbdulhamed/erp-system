using ManagementSystem.Core.IRepositories;
using ManagementSystem.Data;
using ManagementSystem.Models;

namespace ManagementSystem.Core.Repositories
{
    public class SupplierOrderTransactionRepository :GenericRepository<SupplierOrderTransaction> ,ISupplierOrderTransactionRepository
    {
        public SupplierOrderTransactionRepository(AppDbContext appDbContext,ILogger logger):base(appDbContext, logger) { }
        
    }
}
