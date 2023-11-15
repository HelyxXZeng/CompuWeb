namespace CompuWeb.Models
{
    public class PromotionUsage
    {
        public PromotionUsage() { }
        public int Id { get; set; }
        public int PromotionId { get; set; }
        public int OrderId { get; set; }
    }
}
