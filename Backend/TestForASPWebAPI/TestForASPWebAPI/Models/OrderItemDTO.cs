namespace CompuWeb.Models
{
    public class OrderItemDTO
    {
        public OrderItemDTO() { }
        public int Id { get; set; }
        public string ProductVariantName { get; set; }
        public string SerialNumber { get; set; }
        public decimal Price { get; set; }
    }
}
