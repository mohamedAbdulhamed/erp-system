namespace ManagementSystem.Models
{
    public class Employee
    {
        public int EmployeeID { get; set; }
        public required string FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public decimal BasicSalary { get; set; }
        public decimal DailySalary { get; set; }
        public decimal Deduction { get; set; } = 0 ;
        public decimal Bonus { get; set; } = 0 ;
        public int DailyCounter { get; set; } = 0 ;
        public DateOnly HiredDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);
        
    }
}
