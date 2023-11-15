using CompuWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestForASPWebAPI.Controllers
{
    [Route("api/staffs")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        private readonly ILogger<StaffController> _logger;
        public StaffController(ILogger<StaffController> logger)
        {
            _logger = logger;
        }
        // GET: api/<ValuesController>
        [HttpGet("GetStaff")]
        public async Task<IActionResult> GetStaff()
        {
            DBController dbController = DBController.GetInstance();
            //var dataTable = new DataTable();

            string command = @$"select * from Staff";
            var dataTable = await dbController.GetData(command);

            var Staffs = new List<Staff>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var Staff = new Staff()
                {
                    Id = (int)dataRow["Id"],
                    Name = (string)dataRow["Name"],
                    Birthdate = (DateTime)dataRow["Birthdate"],
                    Gender = (string)dataRow["Gender"],
                    IdcardNumber = (string)dataRow["IdcardNumber"],
                    Address = (string)dataRow["Address"],
                    JoinDate = (DateTime)dataRow["JoinDate"],
                    PhoneNumber = (string)dataRow["PhoneNumber"],
                    Position = (string)dataRow["Position"],
                    Salary = (decimal)dataRow["Salary"],
                    Other = (string)dataRow["Other"],
                };
                Staffs.Add(Staff);
            }

            return Ok(Staffs);
        }

        // GET api/<ValuesController>/5
        [HttpGet("GetStaffById")]
        public async Task<IActionResult> Get(int id)
        {
            DBController dbController = DBController.GetInstance();

            string command = @$"select * from Staff where Id = {id}";
            var dataTable = await dbController.GetData(command);

            var Staffs = new List<Staff>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var Staff = new Staff()
                {
                    Id = (int)dataRow["Id"],
                    Name = (string)dataRow["Name"],
                    Birthdate = (DateTime)dataRow["Date"],
                    Gender = (string)dataRow["Gender"],
                    IdcardNumber = (string)dataRow["IdcardNumber"],
                    Address = (string)dataRow["Address"],
                    JoinDate = (DateTime)dataRow["JoinDate"],
                    PhoneNumber = (string)dataRow["PhoneNumber"],
                    Position = (string)dataRow["Position"],
                    Salary = (decimal)dataRow["PhoneNumber"],
                    Other = (string)dataRow["PhoneNumber"],
                };
                Staffs.Add(Staff);
            }

            return Ok(Staffs);
        }

        [HttpPost("Insert")]
        public IActionResult Insert([FromBody] Staff value)
        {
            if (value == null) { return BadRequest("Invalid Data!"); }

            string command = $"INSERT INTO Staff (Name, Birthdate, Gender, IdcardNumber, Address, JoinDate, PhoneNumber, Position, Salary, Other) " +
                $"VALUES ('{value.Name}', " +
                $"'{value.Birthdate.ToString("yyyy-MM-dd")}', " +
                $"'{value.Gender}', " +
                $"'{value.IdcardNumber}', " +
                $"'{value.Address}', " +
                $"'{value.JoinDate.ToString("yyyy-MM-dd")}', " +
                $"'{value.PhoneNumber}', " +
                $"'{value.Position}', " +
                $"{value.Salary.ToString("0.00")}, " +
                $"'{value.Other}')";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);

            return NoContent();
        }

        // PUT api/<ValuesController>/5
        [HttpPut("Update")]
        public async Task<IActionResult> Put(int id, [FromBody] Staff value)
        {
            if (!await StaffExists(id)) { return NotFound("Staff not found!"); }

            string command = $"UPDATE Staff SET " +
                $"Name = '{value.Name}', " +
                $"Birthdate = '{value.Birthdate.ToString("yyyy-MM-dd")}', " +
                $"Gender = '{value.Gender}', " +
                $"IdcardNumber = '{value.IdcardNumber}', " +
                $"Address = '{value.Address}', " +
                $"JoinDate = '{value.JoinDate.ToString("yyyy-MM-dd")}', " +
                $"PhoneNumber = '{value.PhoneNumber}', " +
                $"Position = '{value.Position}', " +
                $"Salary = {value.Salary.ToString("0.00")}, " +
                $"Other = '{value.Other}' " +
                $"WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);

            return NoContent();
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!await StaffExists(id)) { return NotFound("Staff not found!"); }

            string command = $"DELETE FROM Staff WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.DeleteData(command);

            return NoContent();
        }
        [HttpGet("Exists")]
        public async Task<bool> StaffExists(int id)
        {
            string command = $"SELECT * FROM Staff WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            DataTable data = await dbController.GetData(command);
            return (data.Rows.Count is not 0);
        }
    }
}
