using CompuWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestForASPWebAPI.Controllers
{
    [Route("api/ratings")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        private readonly ILogger<RatingController> _logger;
        public RatingController(ILogger<RatingController> logger)
        {
            _logger = logger;
        }
        // GET: api/<ValuesController>
        [HttpGet("GetRating")]
        public async Task<IActionResult> GetRating()
        {
            DBController dbController = DBController.GetInstance();
            //var dataTable = new DataTable();

            string command = @$"select * from Rating";
            var dataTable = await dbController.GetData(command);

            var Ratings = new List<Rating>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var Rating = new Rating()
                {
                    Id = (int)dataRow["Id"],
                    OrderItemId = (int)dataRow["OrderItemId"],
                    Date = (DateTime)dataRow["Date"],
                    Rate = (int)dataRow["Rate"],
                    Comment = (string)dataRow["Comment"],
                };
                Ratings.Add(Rating);
            }

            return Ok(Ratings);
        }

        // GET api/<ValuesController>/5
        [HttpGet("GetRatingById")]
        public async Task<IActionResult> Get(int id)
        {
            DBController dbController = DBController.GetInstance();

            string command = @$"select * from Rating where Id = {id}";
            var dataTable = await dbController.GetData(command);

            var Ratings = new List<Rating>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var Rating = new Rating()
                {
                    Id = (int)dataRow["Id"],
                    OrderItemId = (int)dataRow["OrderItemId"],
                    Date = (DateTime)dataRow["Date"],
                    Rate = (int)dataRow["Rate"],
                    Comment = (string)dataRow["Comment"],
                };
                Ratings.Add(Rating);
            }

            return Ok(Ratings);
        }

        [HttpPost("Insert")]
        public void Insert([FromBody] Rating value)
        {
            string command = $"INSERT INTO Rating (OrderItemId, Date, Rate, Comment) VALUES ({value.OrderItemId}, '{value.Date.ToString("yyyy-MM-dd")}', {value.Rate}, '{value.Comment}')";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // PUT api/<ValuesController>/5
        [HttpPut("Update")]
        public void Put(int id, [FromBody] Rating value)
        {
            string command = $"UPDATE Rating SET OrderItemId = {value.OrderItemId}, Date = '{value.Date.ToString("yyyy-MM-dd")}', Rate = {value.Rate}, Comment = '{value.Comment}' WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("Delete")]
        public void Delete(int id)
        {
            string command = $"DELETE FROM Rating WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.DeleteData(command);
            return;
        }
        [HttpGet("Exists")]
        public async Task<bool> RatingExists(int id)
        {
            string command = $"SELECT * FROM Rating WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            DataTable data = await dbController.GetData(command);
            return (data.Rows.Count is not 0);
        }
    }
}
