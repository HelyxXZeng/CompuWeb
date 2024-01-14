using CompuWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestForASPWebAPI.Controllers
{
    [Route("api/payments")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly ILogger<PaymentController> _logger;
        public PaymentController(ILogger<PaymentController> logger)
        {
            _logger = logger;
        }
        // GET: api/<ValuesController>
        [HttpGet("GetPayments")]
        public async Task<IActionResult> GetPayments()
        {
            DBController dbController = DBController.GetInstance();
            //var dataTable = new DataTable();

            string command = @$"select * from Payment";
            var dataTable = await dbController.GetData(command);

            var Payments = new List<Payment>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var Payment = new Payment()
                {
                    Id = (int)dataRow["Id"],
                    OrderId = (int)dataRow["OrderId"],
                    PaymentMethod = (string)dataRow["PaymentMethod"],
                    PaymentStatus = (string)dataRow["PaymentStatus"],
                };
                Payments.Add(Payment);
            }

            return Ok(Payments);
        }

        [HttpGet("GetPaymentByOrderId/{id}")]
        public async Task<IActionResult> GetPaymeGetPaymentByOrderIdntTable(int id)
        {
            DBController dbController = DBController.GetInstance();

            string command = @$"select * from Payment where OrderId = {id}";
            var dataTable = await dbController.GetData(command);

            var Payments = new List<Payment>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var Payment = new Payment()
                {
                    Id = (int)dataRow["Id"],
                    OrderId = (int)dataRow["OrderId"],
                    PaymentMethod = (string)dataRow["PaymentMethod"],
                    PaymentStatus = (string)dataRow["PaymentStatus"],
                };
                Payments.Add(Payment);
            }
            return Ok(Payments);
        }

        // GET api/<ValuesController>/5
        [HttpGet("GetPaymentById/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            DBController dbController = DBController.GetInstance();

            string command = @$"select * from Payment where Id = {id}";
            var dataTable = await dbController.GetData(command);

            var Payments = new List<Payment>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var Payment = new Payment()
                {
                    Id = (int)dataRow["Id"],
                    OrderId = (int)dataRow["OrderId"],
                    PaymentMethod = (string)dataRow["PaymentMethod"],
                    PaymentStatus = (string)dataRow["PaymentStatus"],
                };
                return Ok(Payment);
            }
            return NotFound("Not Exists!");
        }

        [HttpPost("Insert")]
        public IActionResult Insert(Payment value)
        {
            if (value == null) { return BadRequest("Invalid Data!"); }

            string command = $"INSERT INTO Payment (OrderId, PaymentMethod, PaymentStatus) VALUES ({value.OrderId}, N'{value.PaymentMethod}', N'{value.PaymentStatus}')";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);

            return NoContent();
        }

        // PUT api/<ValuesController>/5
        [HttpPut("Update")]
        public async Task<IActionResult> Put(int id, [FromBody] Payment value)
        {
            if (!await PaymentExists(id)) { return NotFound("Payment not found!"); }

            string command = $"UPDATE Payment SET OrderId = {value.OrderId}, PaymentMethod = N'{value.PaymentMethod}', PaymentStatus = N'{value.PaymentStatus}' WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);

            return NoContent();
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!await PaymentExists(id)) { return NotFound("Payment not found!"); }

            string command = $"DELETE FROM Payment WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.DeleteData(command);

            return NoContent();
        }
        [HttpGet("Exists/{id}")]
        public async Task<bool> PaymentExists(int id)
        {
            string command = $"SELECT * FROM Payment WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            DataTable data = await dbController.GetData(command);
            return (data.Rows.Count is not 0);
        }
    }
}
