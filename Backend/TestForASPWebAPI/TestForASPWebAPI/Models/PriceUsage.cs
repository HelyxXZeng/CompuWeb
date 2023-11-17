namespace CompuWeb.Models
{
    public class PriceUsage
    {
        public PriceUsage() { }
        public int Id { get; set; }
        public int PriceId { get; set; }
        public int OrderItemId { get; set; }
    }
}
