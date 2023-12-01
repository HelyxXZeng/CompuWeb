namespace CompuWeb.Models
{
    public class OrderVariant
    {
        public int Id { get; set; }
        public int ProductVariantId { get; set; }
        public int Quantity { get; set; }
    }
}
