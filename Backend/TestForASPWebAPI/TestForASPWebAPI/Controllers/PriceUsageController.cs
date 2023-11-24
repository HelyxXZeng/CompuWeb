using CompuWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestForASPWebAPI.Controllers
{
    [Route("api/priceusages")]
    [ApiController]
    public class PriceUsageController : ControllerBase
    {
        private readonly ILogger<PriceUsageController> _logger;
        public PriceUsageController(ILogger<PriceUsageController> logger)
        {
            _logger = logger;
        }
        // GET: api/<ValuesController>
        [HttpGet("GetPriceUsages")]
        public async Task<IActionResult> GetPriceUsages()
        {
            DBController dbController = DBController.GetInstance();
            //var dataTable = new DataTable();

            string command = @$"select * from PriceUsage";
            var dataTable = await dbController.GetData(command);

            var PriceUsages = new List<PriceUsage>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var PriceUsage = new PriceUsage()
                {
                    Id = (int)dataRow["Id"],
                    PriceId = (int)dataRow["PriceId"],
                    OrderItemId = (int)dataRow["OrderItemId"],
                };
                PriceUsages.Add(PriceUsage);
            }

            return Ok(PriceUsages);
        }

        // GET api/<ValuesController>/5
        [HttpGet("GetPriceUsageById")]
        public async Task<IActionResult> Get(int id)
        {
            DBController dbController = DBController.GetInstance();

            string command = @$"select * from PriceUsage where Id = {id}";
            var dataTable = await dbController.GetData(command);

            var PriceUsages = new List<PriceUsage>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var PriceUsage = new PriceUsage()
                {
                    Id = (int)dataRow["Id"],
                    PriceId = (int)dataRow["PriceId"],
                    OrderItemId = (int)dataRow["OrderItemId"],
                };
                return Ok(PriceUsage);
            }
            return NotFound("Not Exists!");
        }

        [HttpPost("Insert")]
        public void Insert([FromBody] PriceUsage value)
        {
            string command = $"INSERT INTO PriceUsage (PriceId, OrderItemId) VALUES ({value.PriceId}, {value.OrderItemId})";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // PUT api/<ValuesController>/5
        [HttpPut("Update")]
        public void Put(int id, [FromBody] PriceUsage value)
        {
            string command = $"UPDATE PriceUsage SET PriceId = {value.PriceId}, OrderItemId = {value.OrderItemId} WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("Delete")]
        public void Delete(int id)
        {
            string command = $"DELETE FROM PriceUsage WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.DeleteData(command);
            return;
        }
        [HttpGet("Exists")]
        public async Task<bool> PriceUsageExists(int id)
        {
            string command = $"SELECT * FROM PriceUsage WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            DataTable data = await dbController.GetData(command);
            return (data.Rows.Count is not 0);
        }
    }
}
