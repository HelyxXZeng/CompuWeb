using CompuWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestForASPWebAPI.Controllers
{
    [Route("api/returnorderitems")]
    [ApiController]
    public class ReturnOrderItemController : ControllerBase
    {
        private readonly ILogger<ReturnOrderItemController> _logger;
        public ReturnOrderItemController(ILogger<ReturnOrderItemController> logger)
        {
            _logger = logger;
        }
        // GET: api/<ValuesController>
        [HttpGet("GetReturnOrderItems")]
        public async Task<IActionResult> GetReturnOrderItems()
        {
            DBController dbController = DBController.GetInstance();
            //var dataTable = new DataTable();

            string command = @$"select * from ReturnOrderItem";
            var dataTable = await dbController.GetData(command);

            var ReturnOrderItems = new List<ReturnOrderItem>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var ReturnOrderItem = new ReturnOrderItem()
                {
                    Id = (int)dataRow["Id"],
                    OrderItemId = (int)dataRow["OrderItemId"],
                    Date = (DateTime)dataRow["Date"],
                    Price = (decimal)dataRow["Price"],
                    Issues = (string)dataRow["Issues"],
                    Status = (string)dataRow["Status"],
                };
                ReturnOrderItems.Add(ReturnOrderItem);
            }

            return Ok(ReturnOrderItems);
        }

        // GET api/<ValuesController>/5
        [HttpGet("GetReturnOrderItemById/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            DBController dbController = DBController.GetInstance();

            string command = @$"select * from ReturnOrderItem where Id = {id}";
            var dataTable = await dbController.GetData(command);

            var ReturnOrderItems = new List<ReturnOrderItem>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var ReturnOrderItem = new ReturnOrderItem()
                {
                    Id = (int)dataRow["Id"],
                    OrderItemId = (int)dataRow["OrderItemId"],
                    Date = (DateTime)dataRow["Date"],
                    Price = (decimal)dataRow["Price"],
                    Issues = (string)dataRow["Issues"],
                    Status = (string)dataRow["Status"],
                };
                return Ok(ReturnOrderItem);
            }
            return NotFound("Not Exists!");
        }

        [HttpPost("Insert")]
        public void Insert([FromBody] ReturnOrderItem value)
        {
            string command = $"INSERT INTO ReturnOrderItem (OrderItemId, Date, Issues, Status, Price) VALUES ({value.OrderItemId}, '{value.Date.ToString("yyyy-MM-dd")}', N'{value.Issues}', '{value.Status}', {value.Price.ToString("0.00")})";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // PUT api/<ValuesController>/5
        [HttpPut("Update")]
        public void Put(int id, [FromBody] ReturnOrderItem value)
        {
            string command = $"UPDATE ReturnOrderItem SET OrderItemId = {value.OrderItemId}, DateDate = '{value.Date.ToString("yyyy-MM-dd")}', Issues = N'{value.Issues}', Status = '{value.Status}', Price = {value.Price.ToString("0.00")} WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!await ReturnOrderItemExists(id)) { return NotFound("Order Item not found!"); }

            string command = $"DELETE FROM ReturnOrderItem WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.DeleteData(command);

            return NoContent();
        }
        [HttpGet("Exists/{id}")]
        public async Task<bool> ReturnOrderItemExists(int id)
        {
            string command = $"SELECT * FROM ReturnOrderItem WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            DataTable data = await dbController.GetData(command);
            return (data.Rows.Count is not 0);
        }
    }
}
