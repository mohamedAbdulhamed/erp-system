using ManagementSystem.Core.IRepositories;
using ManagementSystem.Core.Repositories;
using ManagementSystem.Data;
using ManagementSystem.Models;

namespace ManagementSystem.Core.Repositories
{
    public class InventoryRepository : GenericRepository<Inventory> , IInventoryRepository
    {
        public InventoryRepository(AppDbContext appDbContext,ILogger logger):base(appDbContext, logger) 
        {
            
        }
    }
}
