using CompuWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestForASPWebAPI.Controllers
{
    [Route("api/orderitems")]
    [ApiController]
    public class OrderItemController : ControllerBase
    {
        private readonly ILogger<OrderItemController> _logger;
        public OrderItemController(ILogger<OrderItemController> logger)
        {
            _logger = logger;
        }
        // GET: api/<ValuesController>
        [HttpGet("GetOrderItems")]
        public async Task<IActionResult> GetOrderItems()
        {
            DBController dbController = DBController.GetInstance();
            //var dataTable = new DataTable();

            string command = @$"select * from OrderItem";
            var dataTable = await dbController.GetData(command);

            var OrderItems = new List<OrderItem>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var OrderItem = new OrderItem()
                {
                    Id = (int)dataRow["Id"],
                    ProductInstanceId = (int)dataRow["Name"],
                    OrderId = (int)dataRow["Description"],
                };
                OrderItems.Add(OrderItem);
            }

            return Ok(OrderItems);
        }

        // GET api/<ValuesController>/5
        [HttpGet("GetOrderItemById")]
        public async Task<IActionResult> Get(int id)
        {
            DBController dbController = DBController.GetInstance();

            string command = @$"select * from OrderItem where Id = {id}";
            var dataTable = await dbController.GetData(command);

            var OrderItems = new List<OrderItem>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var OrderItem = new OrderItem()
                {
                    Id = (int)dataRow["Id"],
                    ProductInstanceId = (int)dataRow["Name"],
                    OrderId = (int)dataRow["Description"],
                };
                return Ok(OrderItem);
            }
            return NotFound("Not Exists!");
        }

        [HttpPost("Insert")]
        public void Insert([FromBody] OrderItem value)
        {
            string command = $"INSERT INTO OrderItem (ProductInstanceId, OrderId) VALUES ({value.ProductInstanceId}, {value.OrderId})";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // PUT api/<ValuesController>/5
        [HttpPut("Update")]
        public void Put(int id, [FromBody] OrderItem value)
        {
            string command = $"UPDATE OrderItem SET ProductInstanceId = {value.ProductInstanceId}, OrderId = {value.OrderId} WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("Delete")]
        public void Delete(int id)
        {
            string command = $"DELETE FROM OrderItem WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.DeleteData(command);
            return;
        }
        [HttpGet("Exists")]
        public async Task<bool> OrderItemExists(int id)
        {
            string command = $"SELECT * FROM OrderItem WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            DataTable data = await dbController.GetData(command);
            return (data.Rows.Count is not 0);
        }
    }
}
