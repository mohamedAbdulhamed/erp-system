using Management_System.Core.IRepositories;
using ManagementSystem.Core.Repositories;
using ManagementSystem.Data;
using ManagementSystem.Models;

namespace Management_System.Core.Repositories
{
    public class SupplierRepository :GenericRepository<Supplier> , ISupplierRepository
    {
        public SupplierRepository(AppDbContext context,ILogger logger):base(context, logger) 
        {
            
        }
    }
}
