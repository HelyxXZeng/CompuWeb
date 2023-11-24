namespace CompuWeb.Models
{
    public class Specification
    {
        public Specification() { }
        public int Id { get; set; }
        public int SpecificationTypeId { get; set; }
        public string Value { get; set; }
    }
}
