﻿namespace CompuWeb.Models
{
    public class ProductVariant
    {
        public ProductVariant() { }
        public int Id { get; set; }
        public int ProductLineId { get; set; }
        public string Name { get; set; }
    }
}