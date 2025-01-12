namespace ManagementSystem.Dtos.Supplier
{
    public class UpdateSupplierRequest
    {
        public int SupplierId { get; set; }
        public required string SupplierName { get; set; }
        public required string phoneNumber { get; set; }
    }
}
