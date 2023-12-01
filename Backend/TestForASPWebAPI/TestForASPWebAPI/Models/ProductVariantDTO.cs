namespace TestForASPWebAPI.Models
{
    public class ProductVariantDTO
    {
        public ProductVariantDTO() { }
        public int Id { get; set; }
        public string Name { get; set; }
        public string CategoryName { get; set; }
        public int NumberInStock { get; set; }
        public decimal Price { get; set; }
    }
}
