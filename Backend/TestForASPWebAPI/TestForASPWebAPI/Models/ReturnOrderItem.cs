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
    public class ReturnItemTable
    {
        public ReturnItemTable() { }
        public int Id { get; set; }
        public decimal Price { get; set; }
        public DateTime Date { get; set; }
        public string Issues { get; set; }
        public string Status { get; set; }
        public string Name { get; set; }
        public string CustomerName { get; set; }
    }
}
