using CompuWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestForASPWebAPI.Controllers
{
    [Route("api/specificationtypes")]
    [ApiController]
    public class SpecificationTypeController : ControllerBase
    {
        private readonly ILogger<SpecificationTypeController> _logger;
        public SpecificationTypeController(ILogger<SpecificationTypeController> logger)
        {
            _logger = logger;
        }
        // GET: api/<ValuesController>
        [HttpGet("GetSpecificationType")]
        public async Task<IActionResult> GetSpecificationType()
        {
            DBController dbController = DBController.GetInstance();
            //var dataTable = new DataTable();

            string command = @$"select * from SpecificationType";
            var dataTable = await dbController.GetData(command);

            var SpecificationTypes = new List<SpecificationType>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var SpecificationType = new SpecificationType()
                {
                    Id = (int)dataRow["Id"],
                    Name = (string)dataRow["Name"],
                };
                SpecificationTypes.Add(SpecificationType);
            }

            return Ok(SpecificationTypes);
        }

        // GET api/<ValuesController>/5
        [HttpGet("GetSpecificationTypeById")]
        public async Task<IActionResult> Get(int id)
        {
            DBController dbController = DBController.GetInstance();

            string command = @$"select * from SpecificationType where Id = {id}";
            var dataTable = await dbController.GetData(command);

            var SpecificationTypes = new List<SpecificationType>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var SpecificationType = new SpecificationType()
                {
                    Id = (int)dataRow["Id"],
                    Name = (string)dataRow["Name"],
                };
                SpecificationTypes.Add(SpecificationType);
            }

            return Ok(SpecificationTypes);
        }

        [HttpPost("Insert")]
        public void Insert([FromBody] SpecificationType value)
        {
            string command = $"INSERT INTO SpecificationType (Name) VALUES ('{value.Name}')";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // PUT api/<ValuesController>/5
        [HttpPut("Update")]
        public void Put(int id, [FromBody] SpecificationType value)
        {
            string command = $"UPDATE SpecificationType SET Name = '{value.Name}' WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("Delete")]
        public void Delete(int id)
        {
            string command = $"DELETE FROM SpecificationType WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.DeleteData(command);
            return;
        }
        [HttpGet("Exists")]
        public async Task<bool> SpecificationTypeExists(int id)
        {
            string command = $"SELECT * FROM SpecificationType WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            DataTable data = await dbController.GetData(command);
            return (data.Rows.Count is not 0);
        }
    }
}
