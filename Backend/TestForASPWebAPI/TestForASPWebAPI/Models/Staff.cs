namespace CompuWeb.Models
{
    public class Staff
    {
        public Staff() { }
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Birthdate { get; set; }
        public string Gender { get; set; }
        public string IdcardNumber { get; set; }
        public string Address { get; set; }
        public DateTime JoinDate { get; set; }
        public string PhoneNumber { get; set; }
        public string Position { get; set; }
        public decimal Salary { get; set; }
        public string Other { get; set; }
    }
}
