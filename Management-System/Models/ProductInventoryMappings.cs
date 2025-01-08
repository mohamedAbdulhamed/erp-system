namespace ManagementSystem.Models
{
    public class ProductInventoryMappings
    {
        public int ProductID { get; set; }
        public Product Product { get; set; }      
        public int InventoryID { get; set; }
        public Inventory Inventory { get; set; } 

        public int Quantity { get; set; }

        
    }
}
