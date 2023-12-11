using CompuWeb.Models;

namespace TestForASPWebAPI.Models
{
    public class ProductVariantDetailDTO
    {
        public ProductVariantDetailDTO() { }
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public decimal AverageRating { get; set; }
        public int RatingCount { get; set; }
        public List<ProductImage> Images { get; set; }
        public List<Tuple<ProductSpecification, Specification, SpecificationType>> Specifications { get; set; }
        public List<RatingDTO> Ratings { get; set; }
        public List<ProductVariant> ProductVariants { get; set; }
    }
}
