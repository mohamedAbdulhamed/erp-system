using System.ComponentModel.DataAnnotations;

namespace ManagementSystem.Models
{
    public class Product
    {
        [Key]
        public int ProductID { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
        public decimal SellingPrice { get; set; }
        public decimal PurchasePrice { get; set; }
        public int Quantity { get; set; } = 0;
        public int ReorderLevel { get; set; } 

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; }
        public bool IsActive { get; set; } = true; // To soft-delete products

        public int? SupplierID { get; set; }
        public virtual Supplier Supplier { get; set; }

        public int ProductCategoryID { get; set; }
        public virtual ProductCategory ProductCategory  { get; set; }
        public int? FactoryID { get; set; }
        public virtual Factory Factory { get; set; }


    }
}
