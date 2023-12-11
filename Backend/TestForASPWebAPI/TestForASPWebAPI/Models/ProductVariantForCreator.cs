using CompuWeb.Models;

namespace TestForASPWebAPI.Models
{
    public class ProductVariantForCreator
    {
        public ProductVariantForCreator() { }
        public int Id { get; set; }
        public int ProductLineId { get; set; }
        public string Name { get; set; }
        public List<ProductSpecification>? ProductSpecifications { get; set; }
    }
}
