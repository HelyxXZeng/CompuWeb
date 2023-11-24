using CompuWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestForASPWebAPI.Controllers
{
    [Route("api/promotions")]
    [ApiController]
    public class PromotionController : ControllerBase
    {
        private readonly ILogger<PromotionController> _logger;
        public PromotionController(ILogger<PromotionController> logger)
        {
            _logger = logger;
        }
        // GET: api/<ValuesController>
        [HttpGet("GetPromotions")]
        public async Task<IActionResult> GetPromotions()
        {
            DBController dbController = DBController.GetInstance();
            //var dataTable = new DataTable();

            string command = @$"select * from Promotion";
            var dataTable = await dbController.GetData(command);

            var Promotions = new List<Promotion>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var Promotion = new Promotion()
                {
                    Id = (int)dataRow["Id"],
                    Name = (string)dataRow["Name"],
                    ProductVariantIdPromotion = (int)dataRow["ProductVariantIdPromotion"],
                    ProductVariantIdPurchase = (int)dataRow["ProductVariantIdPurchase"],
                    StartDate = (DateTime)dataRow["StartDate"],
                    EndDate = (DateTime)dataRow["EndDate"],
                    Content = (string)dataRow["Content"],
                    Value = (decimal)dataRow["Value"],
                    Status = (string)dataRow["Status"],
                };
                Promotions.Add(Promotion);
            }

            return Ok(Promotions);
        }

        // GET api/<ValuesController>/5
        [HttpGet("GetPromotionById")]
        public async Task<IActionResult> Get(int id)
        {
            DBController dbController = DBController.GetInstance();

            string command = @$"select * from Promotion where Id = {id}";
            var dataTable = await dbController.GetData(command);

            var Promotions = new List<Promotion>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var Promotion = new Promotion()
                {
                    Id = (int)dataRow["Id"],
                    Name = (string)dataRow["Name"],
                    ProductVariantIdPromotion = (int)dataRow["ProductVariantIdPromotion"],
                    ProductVariantIdPurchase = (int)dataRow["ProductVariantIdPurchase"],
                    StartDate = (DateTime)dataRow["StartDate"],
                    EndDate = (DateTime)dataRow["EndDate"],
                    Content = (string)dataRow["Content"],
                    Value = (decimal)dataRow["Value"],
                    Status = (string)dataRow["Status"],
                };
                return Ok(Promotion);
            }
            return NotFound("Not Exists!");
        }

        [HttpPost("Insert")]
        public void Insert([FromBody] Promotion value)
        {
            string command = $"INSERT INTO Promotion (Name, ProductVariantIdPurchase, ProductVariantIdPromotion, StartDate, EndDate, Content, Value, Status) VALUES (N'{value.Name}', {value.ProductVariantIdPurchase}, {value.ProductVariantIdPromotion}, '{value.StartDate.ToString("yyyy-MM-dd")}', '{value.EndDate.ToString("yyyy-MM-dd")}', N'{value.Content}', {value.Value.ToString("0.00")}, '{value.Status}')";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // PUT api/<ValuesController>/5
        [HttpPut("Update")]
        public void Put(int id, [FromBody] Promotion value)
        {
            string command = $"UPDATE Promotion SET ProductVariantIdPurchase = {value.ProductVariantIdPurchase}, ProductVariantIdPromotion = {value.ProductVariantIdPromotion}, Name = N'{value.Name}', StartDate = '{value.StartDate.ToString("yyyy-MM-dd")}', EndDate = '{value.EndDate.ToString("yyyy-MM-dd")}', Content = N'{value.Content}', Value = {value.Value.ToString("0.00")}, Status = '{value.Status}' WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("Delete")]
        public void Delete(int id)
        {
            string command = $"DELETE FROM Promotion WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.DeleteData(command);
            return;
        }
        [HttpGet("Exists")]
        public async Task<bool> PromotionExists(int id)
        {
            string command = $"SELECT * FROM Promotion WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            DataTable data = await dbController.GetData(command);
            return (data.Rows.Count is not 0);
        }
    }
}
