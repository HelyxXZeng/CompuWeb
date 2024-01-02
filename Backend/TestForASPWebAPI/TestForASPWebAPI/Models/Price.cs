namespace CompuWeb.Models
{
    public class Price
    {
        public Price() { }
        public int Id { get; set; }
        public int ProductVariantId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal Value { get; set; }
        public string Status { get; set; }
    }
    public class PriceDTO
    {
        public PriceDTO() { }
        public int Id { get; set; }
        public string ProductVariantName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal Value { get; set; }
        public string Status { get; set; }
    }
}
