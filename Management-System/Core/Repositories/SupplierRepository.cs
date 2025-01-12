using ManagementSystem.Core.IRepositories;
using ManagementSystem.Core.Repositories;
using ManagementSystem.Data;
using ManagementSystem.Models;

namespace ManagementSystem.Core.Repositories
{
    public class SupplierRepository :GenericRepository<Supplier> , ISupplierRepository
    {
        public SupplierRepository(AppDbContext context,ILogger logger):base(context, logger) 
        {
            
        }
    }
}
