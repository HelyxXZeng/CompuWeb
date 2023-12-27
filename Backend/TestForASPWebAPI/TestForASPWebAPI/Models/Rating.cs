namespace CompuWeb.Models
{
    public class Rating
    {
        public Rating() { }
        public int Id { get; set; }
        public int OrderItemId { get; set; }
        public DateTime Date { get; set; }
        public int Rate { get; set; }
        public string Comment { get; set; }
        public string Status { get; set; }
    }
}
