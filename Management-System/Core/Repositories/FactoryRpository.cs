using ManagementSystem.Core.IRepositories;
using ManagementSystem.Core.Repositories;
using ManagementSystem.Data;
using ManagementSystem.Models;

namespace ManagementSystem.Core.Repositories
{
    public class FactoryRpository :GenericRepository<Factory> , IFactoryRpository
    {
        public FactoryRpository(AppDbContext appDbContext, ILogger logger):base(appDbContext, logger) 
        {
            
        }
    }
}
