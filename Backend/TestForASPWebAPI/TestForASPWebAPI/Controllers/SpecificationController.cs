using CompuWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestForASPWebAPI.Controllers
{
    [Route("api/specifications")]
    [ApiController]
    public class SpecificationController : ControllerBase
    {
        private readonly ILogger<SpecificationController> _logger;
        public SpecificationController(ILogger<SpecificationController> logger)
        {
            _logger = logger;
        }
        // GET: api/<ValuesController>
        [HttpGet("GetSpecification")]
        public async Task<IActionResult> GetSpecifications()
        {
            DBController dbController = DBController.GetInstance();
            //var dataTable = new DataTable();

            string command = @$"select * from Specification";
            var dataTable = await dbController.GetData(command);

            var Specifications = new List<Specification>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var Specification = new Specification()
                {
                    Id = (int)dataRow["Id"],
                    SpecificationTypeId = (int)dataRow["SpecificationTypeId"],
                    Value = (string)dataRow["Value"],
                };
                Specifications.Add(Specification);
            }

            return Ok(Specifications);
        }

        // GET api/<ValuesController>/5
        [HttpGet("GetSpecificationById")]
        public async Task<IActionResult> Get(int id)
        {
            DBController dbController = DBController.GetInstance();

            string command = @$"select * from Specification where Id = {id}";
            var dataTable = await dbController.GetData(command);

            var Specifications = new List<Specification>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var Specification = new Specification()
                {
                    Id = (int)dataRow["Id"],
                    SpecificationTypeId = (int)dataRow["SpecificationTypeId"],
                    Value = (string)dataRow["Value"],
                };
                return Ok(Specification);
            }
            return NotFound("Not Exists!");
        }

        [HttpPost("Insert")]
        public void Insert([FromBody] Specification value)
        {
            string command = $"INSERT INTO Specification (SpecificationTypeId, Value) VALUES ({value.SpecificationTypeId}, '{value.Value}')";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // PUT api/<ValuesController>/5
        [HttpPut("Update")]
        public void Put(int id, [FromBody] Specification value)
        {
            string command = $"UPDATE Specification SET SpecificationTypeId = {value.SpecificationTypeId}, Value = '{value.Value}' WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("Delete")]
        public void Delete(int id)
        {
            string command = $"DELETE FROM Specification WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.DeleteData(command);
            return;
        }
        [HttpGet("Exists")]
        public async Task<bool> SpecificationExists(int id)
        {
            string command = $"SELECT * FROM Specification WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            DataTable data = await dbController.GetData(command);
            return (data.Rows.Count is not 0);
        }
    }
}
