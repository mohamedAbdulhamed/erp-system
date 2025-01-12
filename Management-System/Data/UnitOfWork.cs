using ManagementSystem.Core.IRepositories;
using ManagementSystem.Core.Repositories;
using ManagementSystem.Core.IConfiguration;
namespace ManagementSystem.Data;

public class UnitOfWork : IUnitOfWork, IDisposable
{
    private readonly AppDbContext _context;
    private readonly ILogger _logger;

    public ICustomerRepository Customers { get; private set; }
    public ISupplierRepository Suppliers { get; private set; }
    public IFactoryRpository Factories { get; private set; }
    public IInventoryRepository Inventories {  get; private set; }  
    public ICustomerOrderTransactionRepository CustomerOrderTransactions { get; private set; }
    public ICustomerBalanceRepository CustomerBalances {  get; private set; }
    public IProductRepository Products { get; private set; }
    public ISupplierOrderTransactionRepository SupplierOrderTransactions { get; private set; }
    public ICustomerOrderRepository CustomerOrders { get; private set; }

    public ISupplierBalanceRepository SupplierBalances { get; private set; }

    public UnitOfWork(AppDbContext context, ILoggerFactory loggerFactory)
    {
        _context = context;
        _logger = loggerFactory.CreateLogger("logs");

        // Initialize repositories
        Customers = new CustomerRepository(_context,_logger);
        Suppliers = new SupplierRepository(_context,_logger);
        Factories = new FactoryRpository(_context,_logger);
        Inventories = new InventoryRepository(_context,_logger);
        CustomerOrderTransactions = new CustomerOrderTransactionRepository(_context,_logger);
        CustomerBalances = new CustomerBalanceRepository(_context,_logger);
        SupplierOrderTransactions = new SupplierOrderTransactionRepository(_context,_logger);
        SupplierBalances = new SupplierBalanceRepository(_context,_logger);
        Products = new ProductRepository(_context,_logger);
        CustomerOrders = new CustomerOrderRepository(_context,_logger);
    }

    public async Task CompleteAsync()
    {
        await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}
