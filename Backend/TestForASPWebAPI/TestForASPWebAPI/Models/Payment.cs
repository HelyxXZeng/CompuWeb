namespace CompuWeb.Models
{
    public class Payment
    {
        public Payment() { }
        public int Id { get; set; }
        public int OrderId { get; set; }
        public string PaymentMethod { get; set; }
        public string PaymentStatus { get; set; }
    }
}
