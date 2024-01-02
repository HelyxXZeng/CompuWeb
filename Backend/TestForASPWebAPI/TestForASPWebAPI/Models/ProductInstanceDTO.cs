namespace TestForASPWebAPI.Models
{
    public class ProductInstanceDTO
    {
        public ProductInstanceDTO() { }
        public int Id { get; set; }
        public string ProductVariantName { get; set; }
        public string SerialNumber { get; set; }
        public string Status { get; set; }
        public bool Available { get; set; }
    }
}
