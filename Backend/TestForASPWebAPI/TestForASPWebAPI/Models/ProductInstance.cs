namespace CompuWeb.Models
{
    public class ProductInstance
    {
        public ProductInstance() { }
        public int Id { get; set; }
        public int ProductVariantId { get; set; }
        public string SerialNumber { get; set; }
        public string Status { get; set; }
        public bool Available { get; set; }
    }
}
