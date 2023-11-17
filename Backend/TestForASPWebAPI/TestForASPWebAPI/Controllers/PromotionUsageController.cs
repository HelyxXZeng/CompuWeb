using CompuWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestForASPWebAPI.Controllers
{
    [Route("api/promotionusages")]
    [ApiController]
    public class PromotionUsageController : ControllerBase
    {
        private readonly ILogger<PromotionUsageController> _logger;
        public PromotionUsageController(ILogger<PromotionUsageController> logger)
        {
            _logger = logger;
        }
        // GET: api/<ValuesController>
        [HttpGet("GetPromotionUsage")]
        public async Task<IActionResult> GetPromotionUsages()
        {
            DBController dbController = DBController.GetInstance();
            //var dataTable = new DataTable();

            string command = @$"select * from PromotionUsage";
            var dataTable = await dbController.GetData(command);

            var PromotionUsages = new List<PromotionUsage>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var PromotionUsage = new PromotionUsage()
                {
                    Id = (int)dataRow["Id"],
                    PromotionId = (int)dataRow["PromotionId"],
                    OrderId = (int)dataRow["OrderId"],
                };
                PromotionUsages.Add(PromotionUsage);
            }

            return Ok(PromotionUsages);
        }

        // GET api/<ValuesController>/5
        [HttpGet("GetPromotionUsageById")]
        public async Task<IActionResult> Get(int id)
        {
            DBController dbController = DBController.GetInstance();

            string command = @$"select * from PromotionUsage where Id = {id}";
            var dataTable = await dbController.GetData(command);

            var PromotionUsages = new List<PromotionUsage>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var PromotionUsage = new PromotionUsage()
                {
                    Id = (int)dataRow["Id"],
                    PromotionId = (int)dataRow["PromotionId"],
                    OrderId = (int)dataRow["OrderId"],
                };
                return Ok(PromotionUsage);
            }
            return NotFound("Not Exists!");
        }

        [HttpPost("Insert")]
        public void Insert([FromBody] PromotionUsage value)
        {
            string command = $"INSERT INTO PromotionUsage (PromotionId, OrderId) VALUES ({value.PromotionId}, {value.OrderId})";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // PUT api/<ValuesController>/5
        [HttpPut("Update")]
        public void Put(int id, [FromBody] PromotionUsage value)
        {
            string command = $"UPDATE PromotionUsage SET PromotionId = {value.PromotionId}, OrderId = {value.OrderId} WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("Delete")]
        public void Delete(int id)
        {
            string command = $"DELETE FROM PromotionUsage WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.DeleteData(command);
            return;
        }
        [HttpGet("Exists")]
        public async Task<bool> PromotionUsageExists(int id)
        {
            string command = $"SELECT * FROM PromotionUsage WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            DataTable data = await dbController.GetData(command);
            return (data.Rows.Count is not 0);
        }
    }
}
