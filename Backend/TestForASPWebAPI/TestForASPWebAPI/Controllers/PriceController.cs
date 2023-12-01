using CompuWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestForASPWebAPI.Controllers
{
    [Route("api/prices")]
    [ApiController]
    public class PriceController : ControllerBase
    {
        private readonly ILogger<PriceController> _logger;
        public PriceController(ILogger<PriceController> logger)
        {
            _logger = logger;
        }
        // GET: api/<ValuesController>
        [HttpGet("GetPrices")]
        public async Task<IActionResult> GetPrices()
        {
            DBController dbController = DBController.GetInstance();
            //var dataTable = new DataTable();

            string command = @$"select * from Price";
            var dataTable = await dbController.GetData(command);

            var Prices = new List<Price>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var Price = new Price()
                {
                    Id = (int)dataRow["Id"],
                    ProductVariantId = (int)dataRow["ProductVariantId"],
                    StartDate = (DateTime)dataRow["StartDate"],
                    EndDate = (DateTime)dataRow["EndDate"],
                    Status = (string)dataRow["Status"],
                    Value = (decimal)dataRow["Value"],
                };
                Prices.Add(Price);
            }

            return Ok(Prices);
        }

        // GET api/<ValuesController>/5
        [HttpGet("GetPriceById/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            DBController dbController = DBController.GetInstance();

            string command = @$"select * from Price where Id = {id}";
            var dataTable = await dbController.GetData(command);

            var Prices = new List<Price>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var Price = new Price()
                {
                    Id = (int)dataRow["Id"],
                    ProductVariantId = (int)dataRow["ProductVariantId"],
                    StartDate = (DateTime)dataRow["StartDate"],
                    EndDate = (DateTime)dataRow["EndDate"],
                    Status = (string)dataRow["Status"],
                    Value = (decimal)dataRow["Value"],
                };
                return Ok(Price);
            }
            return NotFound("Not Exists!");
        }

        [HttpPost("Insert")]
        public void Insert([FromBody] Price value)
        {
            string command = $"INSERT INTO Price (ProductVariantId, StartDate, EndDate, Status, Value) VALUES ({value.ProductVariantId}, '{value.StartDate.ToString("yyyy-MM-dd")}', '{value.EndDate.ToString("yyyy-MM-dd")}', '{value.Status}', '{value.Value.ToString("0.00")}')";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // PUT api/<ValuesController>/5
        [HttpPut("Update")]
        public void Put(int id, [FromBody] Price value)
        {
            string command = $"UPDATE Price SET ProductVariantId = {value.ProductVariantId}, StartDate = '{value.StartDate.ToString("yyyy-MM-dd")}', EndDate = '{value.EndDate.ToString("yyyy-MM-dd")}', Status = '{value.Status}', Value = '{value.Value}' WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!await PriceExists(id)) { return NotFound("Price not found!"); }

            string command = $"DELETE FROM Price WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.DeleteData(command);

            return NoContent();
        }
        [HttpGet("Exists/{id}")]
        public async Task<bool> PriceExists(int id)
        {
            string command = $"SELECT * FROM Price WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            DataTable data = await dbController.GetData(command);
            return (data.Rows.Count is not 0);
        }

        [HttpGet("UpdatePriceStatus")]
        public static async Task<bool> UpdatePriceStatus()
        {
            DBController dbController = DBController.GetInstance();
            //var dataTable = new DataTable();

            string command = @$"select * from Price where Status = 'ACTIVE' or Status = 'NOTREADY'";
            var dataTable = await dbController.GetData(command);

            var Prices = new List<Price>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var Price = new Price()
                {
                    Id = (int)dataRow["Id"],
                    ProductVariantId = (int)dataRow["ProductVariantId"],
                    StartDate = (DateTime)dataRow["StartDate"],
                    EndDate = (DateTime)dataRow["EndDate"],
                    Status = (string)dataRow["Status"],
                    Value = (decimal)dataRow["Value"],
                };
                if (Price.Status is "ACTIVE" && Price.EndDate < DateTime.Now)
                {
                    string UpdateCommand = $"UPDATE Price SET Status = 'OUTDATED' WHERE Id = {Price.Id}";
                    dbController.UpdateData(UpdateCommand);
                }
                else if (Price.Status is "NOTREADY" && Price.StartDate > DateTime.Now)
                {
                    string UpdateCommand = $"UPDATE Price SET Status = 'ACTIVE' WHERE Id = {Price.Id}";
                    dbController.UpdateData(UpdateCommand);
                }
            }
            return true;
        }
    }
}
