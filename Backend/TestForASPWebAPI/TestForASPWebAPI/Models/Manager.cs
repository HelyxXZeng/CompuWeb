namespace CompuWeb.Models
{
    public class Manager
    {
        public Manager() { }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Avatar { get; set; }
        public DateTime Birthday { get; set; }
        public string Gender { get; set; }
        public string IdcardNumber { get; set; }
        public string Address { get; set; }
        public DateTime JoinDate { get; set; }
        public string PhoneNumber { get; set; }
        public string Position { get; set; }
        public decimal Salary { get; set; }
        public string Department { get; set; }
        public string Other { get; set; }
    }
}
