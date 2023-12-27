using CompuWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestForASPWebAPI.Controllers
{
    [Route("api/customers")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ILogger<CustomerController> _logger;
        public CustomerController(ILogger<CustomerController> logger)
        {
            _logger = logger;
        }
        // GET: api/<ValuesController>
        [HttpGet("GetCustomers")]
        public async Task<IActionResult> GetCustomers()
        {
            DBController dbController = DBController.GetInstance();
            //var dataTable = new DataTable();

            string command = @$"select * from Customer";
            var dataTable = await dbController.GetData(command);

            var Customers = new List<Customer>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var Customer = new Customer()
                {
                    Id = (int)dataRow["Id"],
                    Name = (string)dataRow["Name"],
                    Birthdate = (DateTime)dataRow["Birthdate"],
                    JoinDate = (DateTime)dataRow["JoinDate"],
                    PhoneNumber = (string)dataRow["PhoneNumber"],
                };
                Customers.Add(Customer);
            }

            return Ok(Customers);
        }

        // GET api/<ValuesController>/5
        [HttpGet("GetCustomerById/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            DBController dbController = DBController.GetInstance();

            string command = @$"select * from Customer where Id = {id}";
            var dataTable = await dbController.GetData(command);

            var Customers = new List<Customer>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var Customer = new Customer()
                {
                    Id = (int)dataRow["Id"],
                    Name = (string)dataRow["Name"],
                    Birthdate = (DateTime)dataRow["Birthdate"],
                    JoinDate = (DateTime)dataRow["JoinDate"],
                    PhoneNumber = (string)dataRow["PhoneNumber"],
                };
                return Ok(Customer);
            }
            return NotFound("Not Exists!");
        }

        [HttpPost("Insert")]
        public async Task<IActionResult> Insert([FromBody] Customer value)
        {
            string command = $"INSERT INTO Customer (Name, PhoneNumber, Birthdate, JoinDate) VALUES (N'{value.Name}', '{value.PhoneNumber}', '{value.Birthdate.ToString("yyyy-MM-dd")}', '{DateTime.Now.ToString("yyyy-MM-dd")}')";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            string GetCreatedCus = $"select MaxId from Customer where PhoneNumber = '{value.PhoneNumber}'";
            int Id = await dbController.GetCount(GetCreatedCus);
            return Ok(Id);
        }

        // PUT api/<ValuesController>/5
        [HttpPut("Update")]
        public void Put(int id, [FromBody] Customer value)
        {
            string command = $"UPDATE Customer SET Name = N'{value.Name}', PhoneNumber = '{value.PhoneNumber}', JoinDate = '{value.JoinDate.ToString("yyyy-MM-dd")}', Birthdate = '{value.Birthdate.ToString("yyyy-MM-dd")}' WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!await CustomerExists(id)) { return NotFound("Customer not found!"); }

            string command = $"DELETE FROM Customer WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.DeleteData(command);

            return NoContent();
        }
        [HttpGet("Exists/{id}")]
        public async Task<bool> CustomerExists(int id)
        {
            string command = $"SELECT * FROM Customer WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            DataTable data = await dbController.GetData(command);
            return (data.Rows.Count is not 0);
        }
    }
}
