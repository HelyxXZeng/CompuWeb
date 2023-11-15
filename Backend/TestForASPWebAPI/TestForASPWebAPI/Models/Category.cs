using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace CompuWeb.Models
{
    public class Category
    {
        public Category() { }
        public Category(int id, string name)
        {
            Id = id;
            Name = name;
        }

        public int Id { get; set; }
        public string Name { get; set; }
    }
}
