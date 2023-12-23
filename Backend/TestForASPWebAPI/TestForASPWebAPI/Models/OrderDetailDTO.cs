﻿namespace CompuWeb.Models
{
    public class OrderDetailDTO
    {
        public OrderDetailDTO() { }
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhoneNumber { get; set; }
        public string Address { get; set; }
        public decimal Total { get; set; }
        public string Status { get; set; }
        public DateTime Date { get; set; }
        public string Note { get; set; }
        public List<OrderItemDTO> orderItems { get; set; }
    }
}