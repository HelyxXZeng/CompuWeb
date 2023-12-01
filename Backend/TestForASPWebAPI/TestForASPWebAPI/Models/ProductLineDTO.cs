namespace TestForASPWebAPI.Models
{
    public class ProductLineDTO
    {
        public ProductLineDTO() { }
        public int Id { get; set; }
        public string Name { get; set; }
        public string CategoryName { get; set; }
        public DateTime ReleaseDate { get; set; }
    }
}
