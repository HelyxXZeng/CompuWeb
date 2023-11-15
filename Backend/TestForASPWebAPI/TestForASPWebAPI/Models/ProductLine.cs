namespace CompuWeb.Models
{
    public class ProductLine
    {
        public ProductLine() { }
        public ProductLine(int id, int categoryid, int brandid, string name, int releaseDay, int releaseMonth, int releaseYear, int warranty, string description)
            => (ReleaseDate) = (new DateTime(releaseYear, releaseMonth, releaseDay));
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public int BrandId { get; set; }
        public string Name { get; set; }
        public DateTime ReleaseDate { get; set; }
        public int Warranty { get; set; }
        public string Description { get; set; }
    }
}
