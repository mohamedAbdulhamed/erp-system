using ManagementSystem.Core.IRepositories;

using ManagementSystem.Core.Repositories;
using ManagementSystem.Data;
using ManagementSystem.Models;

namespace ManagementSystem.Core.Repositories
{
    public class CustomerRepository : GenericRepository<Customer> , ICustomerRepository 
    {
        public CustomerRepository(AppDbContext context, ILogger logger) : base(context, logger)
        {
            
        }
    }
}
