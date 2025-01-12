using ManagementSystem.Core.IRepositories;
using ManagementSystem.Core.Repositories;


namespace ManagementSystem.Core.IConfiguration
{
    public interface IUnitOfWork
    {
        ICustomerRepository Customers { get; }
        ISupplierRepository Suppliers { get; }
        IFactoryRpository Factories { get; }
        IProductRepository Products { get; }
        IInventoryRepository Inventories { get; }
        ICustomerOrderTransactionRepository CustomerOrderTransactions { get; }
        ICustomerBalanceRepository CustomerBalances { get; } 
        ISupplierOrderTransactionRepository SupplierOrderTransactions { get; }
        ISupplierBalanceRepository SupplierBalances { get; }
        ICustomerOrderRepository CustomerOrders { get; }
 

        Task CompleteAsync();
    }
}
