namespace CompuWeb.Models
{
    public class ReturnOrderItem
    {
        public ReturnOrderItem() { }
        public int Id { get; set; }
        public int OrderItemId { get; set; }
        public decimal Price { get; set; }
        public DateTime Date { get; set; }
        public string Issues { get; set; }
        public string Status { get; set; }
    }
}
