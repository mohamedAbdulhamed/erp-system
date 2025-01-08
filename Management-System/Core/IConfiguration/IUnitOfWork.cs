using Management_System.Core.IRepositories;
using ManagementSystem.Core.IRepositories;

namespace ManagementSystem.Core.IConfiguration
{
    public interface IUnitOfWork
    {
        ICustomerRepository Customers { get; }
        ISupplierRepository Suppliers { get; }
        IFactoryRpository Factories { get; }
        IInventoryRepository Inventories { get; }

        Task CompleteAsync();
    }
}
