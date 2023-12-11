namespace CompuWeb.Models
{
    public class SpecificationType
    {
        public SpecificationType() { }
        public int Id { get; set; }
        public string Name { get; set; }
    }
    public class SpecificationTypeDTO
    {
        public SpecificationTypeDTO(SpecificationType type) => (Id, Name) = (type.Id, type.Name);
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Specification> Specifications { get; set; }
    }
}
