namespace CompuWeb.Models
{
    public class OrderItem
    {
        public OrderItem() { }
        public int Id { get; set; }
        public int ProductInstanceId { get; set; }
        public int OrderId { get; set; }
    }
}
