using Management_System.Core.IRepositories;
using ManagementSystem.Core.Repositories;
using ManagementSystem.Data;
using ManagementSystem.Models;

namespace Management_System.Core.Repositories
{
    public class FactoryRpository :GenericRepository<Factory> , IFactoryRpository
    {
        public FactoryRpository(AppDbContext appDbContext, ILogger logger):base(appDbContext, logger) 
        {
            
        }
    }
}
