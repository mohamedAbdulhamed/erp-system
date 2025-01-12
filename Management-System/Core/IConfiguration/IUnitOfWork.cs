using ManagementSystem.Core.IRepositories;


namespace ManagementSystem.Core.IConfiguration
{
    public interface IUnitOfWork
    {
        ICustomerRepository Customers { get; }
        ISupplierRepository Suppliers { get; }
        IFactoryRpository Factories { get; }
        IInventoryRepository Inventories { get; }
        ICustomerOrderTransactionRepository CustomerOrderTransactions { get; }
        ICustomerBalanceRepository CustomerBalances { get; } 
        ISupplierOrderTransactionRepository SupplierOrderTransactions { get; }
        ISupplierBalanceRepository SupplierBalances { get; }

        Task CompleteAsync();
    }
}
