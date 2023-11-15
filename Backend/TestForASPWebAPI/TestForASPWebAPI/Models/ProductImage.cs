namespace CompuWeb.Models
{
    public class ProductImage
    {
        public ProductImage() { }
        public ProductImage(int id, int PVid, string name, string url) => (Id, ProductVariantId, Name, Image) = (id, PVid, name, url);
        public int Id { get; set; }
        public int ProductVariantId { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
    }
}
