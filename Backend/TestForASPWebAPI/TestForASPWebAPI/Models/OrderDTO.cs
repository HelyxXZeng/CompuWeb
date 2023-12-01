using TestForASPWebAPI.Models;

namespace CompuWeb.Models
{
    public class OrderDTO
    {
        public OrderDTO() { }
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int StaffId { get; set; }
        public DateTime Date { get; set; }
        public string Note { get; set; }
        public string Status { get; set; }
        public string Address { get; set; }
        public List<OrderVariant> orderItems { get; set; }
    }
}
