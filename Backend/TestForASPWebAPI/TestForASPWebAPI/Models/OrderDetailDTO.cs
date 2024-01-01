namespace CompuWeb.Models
{
    public class OrderDetailDTO
    {
        public OrderDetailDTO() { }
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhoneNumber { get; set; }
        public string Address { get; set; }
        public decimal Total { get; set; }
        public string Status { get; set; }
        public DateTime Date { get; set; }
        public string Note { get; set; }
        public List<OrderItemDTO> orderItems { get; set; }
        public List<OrderVariantByOrderItem> VariantByOrderItems { get; set; }
    }
    public class CustomerOrders
    {
        public CustomerOrders() { }
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; }
        public decimal Total { get; set; }
        public int ItemCount { get; set; }
        public string VariantName { get; set; }
        public string Image { get; set; }
    }
}
