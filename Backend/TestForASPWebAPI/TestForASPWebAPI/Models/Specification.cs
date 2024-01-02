namespace CompuWeb.Models
{
    public class Specification
    {
        public Specification() { }
        public int Id { get; set; }
        public int SpecificationTypeId { get; set; }
        public string Value { get; set; }
    }
    public class SpecificationDTO
    {
        public SpecificationDTO() { }
        public int Id { get; set; }
        public string SpecificationTypeName { get; set; }
        public string Value { get; set; }
    }
}
