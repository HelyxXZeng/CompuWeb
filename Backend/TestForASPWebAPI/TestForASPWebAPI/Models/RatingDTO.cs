namespace CompuWeb.Models
{
    public class RatingDTO
    {
        public RatingDTO(Rating rating)
        {
            this.Rate = rating.Rate;
            this.Date = rating.Date;
            this.Comment = rating.Comment;
            this.Id = rating.Id;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
        public int Rate { get; set; }
        public DateTime Date { get; set; }
    }
}
