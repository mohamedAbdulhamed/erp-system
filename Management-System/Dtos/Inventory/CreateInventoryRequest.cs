using ManagementSystem.Models;

namespace Management_System.Dtos.Inventory
{
    public class CreateInventoryRequest
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string? ContactNumber { get; set; }
        public InventoryType inventoryType { get; set; }
    }
}
