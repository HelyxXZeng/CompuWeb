namespace CompuWeb.Models
{
    public class Customer
    {
        public Customer() { }
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Birthdate { get; set; }
        public DateTime JoinDate { get; set; }
        public string PhoneNumber { get; set; }
    }
    public class CustomerStats
    {
        public CustomerStats() { }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public decimal Total { get; set; }
    }
}
