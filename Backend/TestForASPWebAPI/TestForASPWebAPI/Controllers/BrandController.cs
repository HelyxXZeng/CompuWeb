using CompuWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestForASPWebAPI.Controllers
{
    [Route("api/brands")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly ILogger<BrandController> _logger;
        public BrandController(ILogger<BrandController> logger)
        {
            _logger = logger;
        }
        // GET: api/<ValuesController>
        [HttpGet("GetBrands")]
        public async Task<IActionResult> GetBrands()
        {
            DBController dbController = DBController.GetInstance();
            //var dataTable = new DataTable();

            string command = @$"select * from Brand";
            var dataTable = await dbController.GetData(command);

            var Brands = new List<Brand>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var Brand = new Brand()
                {
                    Id = (int)dataRow["Id"],
                    Name = (string)dataRow["Name"],
                    Description = (string)dataRow["Description"],
                    Logo = (string)dataRow["Url"],
                };
                Brands.Add(Brand);
            }

            return Ok(Brands);
        }

        // GET api/<ValuesController>/5
        [HttpGet("GetBrandById")]
        public async Task<IActionResult> Get(int id)
        {
            DBController dbController = DBController.GetInstance();

            string command = @$"select * from Brand where Id = {id}";
            var dataTable = await dbController.GetData(command);

            var Brands = new List<Brand>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var Brand = new Brand()
                {
                    Id = (int)dataRow["Id"],
                    Name = (string)dataRow["Name"],
                    Description = (string)dataRow["Description"],
                    Logo = (string)dataRow["Url"],
                };
                Brands.Add(Brand);
            }

            return Ok(Brands);
        }

        [HttpPost("Insert")]
        public void Insert(Brand value)
        {
            string command = $"INSERT INTO Brand (Name, Description, Url) VALUES ('{value.Name}', '{value.Description}', '{value.Logo}')";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // PUT api/<ValuesController>/5
        [HttpPut("Update")]
        public async Task<IActionResult> Put(int id, [FromBody] Brand value)
        {
            if (!await BrandExists(id)) { return NotFound(); }

            string command = $"UPDATE Brand SET Name = '{value.Name}', Description = '{value.Description}', Url = '{value.Logo}' WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);

            return NoContent();
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!await BrandExists(id)) { return NotFound(); }

            string command = $"DELETE FROM Brand WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.DeleteData(command);

            return NoContent();
        }
        [HttpGet("Exists")]
        public async Task<bool> BrandExists(int id)
        {
            string command = $"SELECT * FROM Brand WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            DataTable data = await dbController.GetData(command);
            return (data.Rows.Count is not 0);
        }
    }
}
