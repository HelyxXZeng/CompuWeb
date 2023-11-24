using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompuWeb.Models
{
    public class Brand
    {
        public Brand() { }
        public Brand(int id, string name, string description) => (Id, Name, Description) = (id, name, description);
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Logo { get; set; }
    }
}