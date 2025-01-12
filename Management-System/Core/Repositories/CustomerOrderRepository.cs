using ManagementSystem.Core.IRepositories;
using ManagementSystem.Core.Repositories;
using ManagementSystem.Data;
using ManagementSystem.Models;

namespace ManagementSystem.Core.Repositories
{
    public class CustomerOrderRepository : GenericRepository<CustomerOrder>, ICustomerOrderRepository
    {
        public CustomerOrderRepository(AppDbContext appDbContext, ILogger logger) : base(appDbContext, logger)
        {

        }
    }
}
