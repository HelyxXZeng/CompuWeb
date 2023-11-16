using CompuWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestForASPWebAPI.Controllers
{
    [Route("api/productlines")]
    [ApiController]
    public class ProductLineController : ControllerBase
    {
        private readonly ILogger<ProductLineController> _logger;
        public ProductLineController(ILogger<ProductLineController> logger)
        {
            _logger = logger;
        }
        // GET: api/<ValuesController>
        [HttpGet("GetProductLine")]
        public async Task<IActionResult> GetProductLines()
        {
            DBController dbController = DBController.GetInstance();
            //var dataTable = new DataTable();

            string command = @$"select * from ProductLine";
            var dataTable = await dbController.GetData(command);

            var ProductLines = new List<ProductLine>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var ProductLine = new ProductLine()
                {
                    Id = (int)dataRow["Id"],
                    CategoryId = (int)dataRow["CategoryId"],
                    BrandId = (int)dataRow["BrandId"],
                    Name = (string)dataRow["Name"],
                    ReleaseDate = (DateTime)dataRow["ReleaseDate"],
                    Warranty = (int)dataRow["Warranty"],
                    Description = (string)dataRow["Description"],
                };
                ProductLines.Add(ProductLine);
            }

            return Ok(ProductLines);
        }

        // GET api/<ValuesController>/5
        [HttpGet("GetProductLineById")]
        public async Task<IActionResult> Get(int id)
        {
            DBController dbController = DBController.GetInstance();

            string command = @$"select * from ProductLine where Id = {id}";
            var dataTable = await dbController.GetData(command);

            var ProductLines = new List<ProductLine>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var ProductLine = new ProductLine()
                {
                    Id = (int)dataRow["Id"],
                    CategoryId = (int)dataRow["CategoryId"],
                    BrandId = (int)dataRow["BrandId"],
                    Name = (string)dataRow["Name"],
                    ReleaseDate = (DateTime)dataRow["ReleaseDate"],
                    Warranty = (int)dataRow["Warranty"],
                    Description = (string)dataRow["Description"],
                };
                return Ok(ProductLine);
            }
            return NotFound("Not Exists!");
        }

        [HttpPost("Insert")]
        public void Insert([FromBody] ProductLine value)
        {
            string command = $"INSERT INTO ProductLine (CategoryId, BrandId, Name, ReleaseDate, Warranty, Description) VALUES ({value.CategoryId}, {value.BrandId}, N'{value.Name}', '{value.ReleaseDate.ToString("yyyy-MM-dd")}', {value.Warranty}, N'{value.Description}')";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // PUT api/<ValuesController>/5
        [HttpPut("Update")]
        public void Put(int id, [FromBody] ProductLine value)
        {
            string command = $"UPDATE ProductLine SET CategoryId = {value.CategoryId}, BrandId = {value.BrandId}, Name = N'{value.Name}', ReleaseDate = '{value.ReleaseDate.ToString("yyyy-MM-dd")}', Warranty = {value.Warranty}, Description = N'{value.Description}' WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("Delete")]
        public void Delete(int id)
        {
            string command = $"DELETE FROM ProductLine WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.DeleteData(command);
            return;
        }
        [HttpGet("Exists")]
        public async Task<bool> ProductLineExists(int id)
        {
            string command = $"SELECT * FROM ProductLine WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            DataTable data = await dbController.GetData(command);
            return (data.Rows.Count is not 0);
        }
    }
}
