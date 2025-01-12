using System.ComponentModel.DataAnnotations;

namespace ManagementSystem.Models
{
    public class Factory
    {
        [Key]
        public int FactoryID { get; set; }
        public required string Name { get; set; }
        public bool IsActive { get; set; } = true;
        public ICollection<Product> Products { get; set; }
    }
}
