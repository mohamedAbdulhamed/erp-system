using ManagementSystem.Core.IRepositories;

using ManagementSystem.Core.Repositories;
using ManagementSystem.Data;
using ManagementSystem.Models;

namespace ManagementSystem.Core.Repositories
{
    public class ProductRepository : GenericRepository<Product> , IProductRepository 
    {
        public ProductRepository(AppDbContext context, ILogger logger) : base(context, logger)
        {
            
        }
    }
}
