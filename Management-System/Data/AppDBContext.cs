using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ManagementSystem.Models;

namespace ManagementSystem.Data
{
    public class AppDbContext:IdentityDbContext<User>
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<CustomerOrder> CustomerOrders { get; set; }
        public DbSet<CustomerOrderDetail> CustomerOrdersDetails { get; set; }
        public DbSet<CustomerOrderTransaction> CustomerOrderTransactions { get; set; }
        public DbSet<CustomerBalance> CustomerBalances { get; set; }
        public DbSet<Supplier> Suppliers{ get; set; }
        public DbSet<SupplierOrder> SupplierOrders{ get; set; }
        public DbSet<SupplierOrderDetail> supplierOrderDetails{ get; set; }
        public DbSet<SupplierOrderTransaction> supplierOrderTransactions{ get; set; }
        public DbSet<SupplierBalance> SupplierBalances{ get; set; }
        public DbSet<Factory> Factories{ get; set; }
        public DbSet<Inventory> Inventories { get; set; }
        public DbSet<Product> Products{ get; set; }
        public DbSet<ProductCategory> ProductCategories{ get; set; }
       
        


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Product - Supplier (Optional)
            modelBuilder.Entity<Product>()
                .HasOne(p => p.Supplier)
                .WithMany(p=>p.Products)
                .HasForeignKey(p => p.SupplierID)
                .OnDelete(DeleteBehavior.Restrict);

            // Product - ProductCategory
            modelBuilder.Entity<Product>()
                .HasOne(p => p.ProductCategory)
                .WithMany(p => p.Products)
                .HasForeignKey(p => p.ProductCategoryID)
                .OnDelete(DeleteBehavior.Restrict);

            // Composite unique constraint
            modelBuilder.Entity<Product>()
                .HasIndex(p => new { p.Name, p.ProductCategoryID })
                .IsUnique();

            // Product - Factory
            modelBuilder.Entity<Product>()
                .HasOne(p => p.Factory)
                .WithMany(p => p.Products)
                .HasForeignKey(p => p.FactoryID)
                .OnDelete(DeleteBehavior.Restrict);

           
            modelBuilder.Entity<Customer>()
                .HasIndex(c => c.PhoneNumber)
                .IsUnique();
        
            modelBuilder.Entity<Supplier>()
                .HasIndex(c => c.PhoneNumber)
                .IsUnique();
        
        }
    }
}
