namespace CompuWeb.Models
{
    public class ProductImage
    {
        public ProductImage() { }
        public ProductImage(int id, int PLid, string name, string url) => (Id, ProductLineId, Name, Image) = (id, PLid, name, url);
        public int Id { get; set; }
        public int ProductLineId { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
    }
}
