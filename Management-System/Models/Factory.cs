namespace ManagementSystem.Models
{
    public class Factory
    {
        public int FactoryID { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}
