namespace CompuWeb.Models
{
    public class CartItem
    {
        public CartItem() { }
        public int Id { get; set; }
        public int ProductVariantId { get; set; }
        public int CustomerId { get; set; }
        public int Quantity { get; set; }
    }
}
