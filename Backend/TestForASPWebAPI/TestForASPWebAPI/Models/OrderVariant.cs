namespace CompuWeb.Models
{
    public class OrderVariant
    {
        public int Id { get; set; }
        public int ProductVariantId { get; set; }
        public int Quantity { get; set; }
    }
    public class OrderVariantByOrderItem
    {
        public OrderVariantByOrderItem() { }
        public int VariantId { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public List<int> OrderItemIds { get; set; }
    }
}
