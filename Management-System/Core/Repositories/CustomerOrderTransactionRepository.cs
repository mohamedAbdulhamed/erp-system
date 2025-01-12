using ManagementSystem.Core.IRepositories;
using ManagementSystem.Core.Repositories;
using ManagementSystem.Data;
using ManagementSystem.Models;

namespace ManagementSystem.Core.Repositories
{
    public class CustomerOrderTransactionRepository : GenericRepository<CustomerOrderTransaction> , ICustomerOrderTransactionRepository
    {
        public CustomerOrderTransactionRepository(AppDbContext appDbContext,ILogger logger): base(appDbContext, logger) 
        {
            
        }

        
    }
}
