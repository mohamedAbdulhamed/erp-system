namespace ManagementSystem.Models
{
    public class Inventory
    {
        public int InventoryID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string? ContactNumber { get; set; }
        public InventoryType InventoryType {  get; set; }
        public bool IsActive { get; set; } = true;
        
        public ICollection<ProductInventoryMappings> ProductInventoryMappings{ get; set; }
    }
    
    public enum InventoryType
    {
        Warehouse,
        Gallery
    }
}
