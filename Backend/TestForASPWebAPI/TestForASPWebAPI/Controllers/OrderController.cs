using CompuWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestForASPWebAPI.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ILogger<OrderController> _logger;
        public OrderController(ILogger<OrderController> logger)
        {
            _logger = logger;
        }
        // GET: api/<ValuesController>
        [HttpGet("GetOrders")]
        public async Task<IActionResult> GetOrders()
        {
            DBController dbController = DBController.GetInstance();
            //var dataTable = new DataTable();

            string command = @$"select * from Orders";
            var dataTable = await dbController.GetData(command);

            var Orders = new List<Orders>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var Order = new Orders()
                {
                    Id = (int)dataRow["Id"],
                    CustomerId = (int)dataRow["CustomerId"],
                    StaffId = (int)dataRow["StaffId"],
                    Date = (DateTime)dataRow["Date"],
                    Note = (string)dataRow["Note"],
                    Status = (string)dataRow["Status"],
                    Address = (string)dataRow["Address"],
                    Total = (decimal)dataRow["Total"],
                };
                Orders.Add(Order);
            }

            return Ok(Orders);
        }

        // GET api/<ValuesController>/5
        [HttpGet("GetOrderById/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            DBController dbController = DBController.GetInstance();

            string command = @$"select * from Orders where Id = {id}";
            var dataTable = await dbController.GetData(command);

            var Orders = new List<Orders>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var Order = new Orders()
                {
                    Id = (int)dataRow["Id"],
                    CustomerId = (int)dataRow["CustomerId"],
                    StaffId = (int)dataRow["StaffId"],
                    Date = (DateTime)dataRow["Date"],
                    Note = (string)dataRow["Note"],
                    Status = (string)dataRow["Status"],
                    Address = (string)dataRow["Address"],
                    Total = (decimal)dataRow["Total"],
                };
                return Ok(Order);
            }
            return NotFound("Not Exists!");
        }

        [HttpPost("Insert")]
        public void Insert([FromBody] Orders value)
        {
            string command = $"INSERT INTO Orders (CustomerId, StaffId, Date, Note, Status, Address, Total) VALUES ({value.CustomerId}, {value.StaffId}, '{DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")}', N'{value.Note}', '{value.Status}', N'{value.Address}', {value.Total.ToString("0.00")})";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // PUT api/<ValuesController>/5
        [HttpPut("Update")]
        public void Put(int id, Orders value)
        {
            string command = $"UPDATE Orders SET CustomerId = {value.CustomerId}, StaffId = {value.StaffId}, Date = '{value.Date.ToString("yyyy-MM-dd HH:mm:ss")}', Note = N'{value.Note}', Status = '{value.Status}', Address = N'{value.Address}', Total = {value.Total.ToString("0.00")} WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!await OrderExists(id)) { return NotFound("Order not found!"); }

            string command = $"DELETE FROM Orders WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.DeleteData(command);

            return NoContent();
        }
        [HttpGet("Exists/{id}")]
        public async Task<bool> OrderExists(int id)
        {
            string command = $"SELECT * FROM Orders WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            DataTable data = await dbController.GetData(command);
            return (data.Rows.Count is not 0);
        }
    }
}
