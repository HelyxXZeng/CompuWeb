namespace CompuWeb.Models
{
    public class Orders
    {
        public Orders() { }
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int StaffId { get; set; }
        public DateTime Date { get; set; }
        public string Note { get; set; }
        public string Status { get; set; }
        public string Address { get; set; }
        public decimal Total { get; set; }
        public List<OrderItem> Items { get; set; }
    }
}
