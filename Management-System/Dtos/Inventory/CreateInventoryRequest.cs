using ManagementSystem.Models;

namespace ManagementSystem.Dtos.Inventory
{
    public class CreateInventoryRequest
    {
        public required string Name { get; set; }
        public string? Address { get; set; }
        public string? ContactNumber { get; set; }
        public InventoryType InventoryType { get; set; }
    }
}
