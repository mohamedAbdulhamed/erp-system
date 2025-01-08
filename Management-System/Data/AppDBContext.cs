using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ManagementSystem.Models;

namespace ManagementSystem.Data
{
    public class AppDbContext:IdentityDbContext<User>
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<CustomerOrder> Bills { get; set; }
        public DbSet<SupplierOrderDetail> BillProducts{ get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Factory> Factories{ get; set; }
        public DbSet<Inventory> Inventories { get; set; }
        public DbSet<Product> Products{ get; set; }
        public DbSet<ProductCategory> ProductCategories{ get; set; }
        public DbSet<ProductInventoryMappings> ProductInventories{ get; set; }
        public DbSet<Supplier> Suppliers{ get; set; }


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

            // ProductInventory - Product
            modelBuilder.Entity<ProductInventoryMappings>()
                .HasKey(pi => new { pi.ProductID, pi.InventoryID });

            modelBuilder.Entity<ProductInventoryMappings>()
                .HasOne(pi => pi.Product)
                .WithMany(p => p.ProductInventoryMappings)
                .HasForeignKey(pi => pi.ProductID)
                .OnDelete(DeleteBehavior.Restrict);

            // ProductInventory - Inventory
            modelBuilder.Entity<ProductInventoryMappings>()
                .HasOne(pi => pi.Inventory)
                .WithMany(i => i.ProductInventoryMappings)
                .HasForeignKey(pi => pi.InventoryID)
                .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
