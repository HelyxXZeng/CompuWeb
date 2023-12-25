namespace CompuWeb.Models
{
    public class Promotion
    {
        public Promotion() { }
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int ProductVariantIdPurchase { get; set; }
        public int ProductVariantIdPromotion { get; set; }
        public string Content { get; set; }
        public decimal Value { get; set; }
        public string Status { get; set; }
    }
    public class PromotionWNameDTO
    {
        public PromotionWNameDTO() { }
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int ProductVariantIdPurchase { get; set; }
        public string ProductVariantNamePurchase { get; set; }
        public int ProductVariantIdPromotion { get; set; }
        public string ProductVariantNamePromotion { get; set; }
        public string Content { get; set; }
        public decimal Value { get; set; }
        public string Status { get; set; }
    }
}
