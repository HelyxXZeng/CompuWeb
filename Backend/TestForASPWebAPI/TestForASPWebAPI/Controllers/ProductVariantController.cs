using CompuWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestForASPWebAPI.Controllers
{
    [Route("api/productvariants")]
    [ApiController]
    public class ProductVariantController : ControllerBase
    {
        private readonly ILogger<ProductVariantController> _logger;
        public ProductVariantController(ILogger<ProductVariantController> logger)
        {
            _logger = logger;
        }
        // GET: api/<ValuesController>
        [HttpGet("GetProductVariant")]
        public async Task<IActionResult> GetProductVariants()
        {
            DBController dbController = DBController.GetInstance();
            //var dataTable = new DataTable();

            string command = @$"select * from ProductVariant";
            var dataTable = await dbController.GetData(command);

            var ProductVariants = new List<ProductVariant>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var ProductVariant = new ProductVariant()
                {
                    Id = (int)dataRow["Id"],
                    ProductLineId = (int)dataRow["ProductLineId"],
                    Name = (string)dataRow["Name"],
                };
                ProductVariants.Add(ProductVariant);
            }

            return Ok(ProductVariants);
        }

        // GET api/<ValuesController>/5
        [HttpGet("GetProductVariantById")]
        public async Task<IActionResult> Get(int id)
        {
            DBController dbController = DBController.GetInstance();

            string command = @$"select * from ProductVariant where Id = {id}";
            var dataTable = await dbController.GetData(command);

            var ProductVariants = new List<ProductVariant>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var ProductVariant = new ProductVariant()
                {
                    Id = (int)dataRow["Id"],
                    ProductLineId = (int)dataRow["ProductLineId"],
                    Name = (string)dataRow["Name"],
                };
                return Ok(ProductVariant);
            }
            return NotFound("Not Exists!");
        }

        [HttpPost("Insert")]
        public void Insert([FromBody] ProductVariant value)
        {
            string command = $"INSERT INTO ProductVariant (ProductLineId, Name) VALUES ({value.ProductLineId}, N'{value.Name}')";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // PUT api/<ValuesController>/5
        [HttpPut("Update")]
        public void Put(int id, [FromBody] ProductVariant value)
        {
            string command = $"UPDATE ProductVariant SET ProductLineId = {value.ProductLineId}, Name = N'{value.Name}' WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("Delete")]
        public void Delete(int id)
        {
            string command = $"DELETE FROM ProductVariant WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.DeleteData(command);
            return;
        }
        [HttpGet("Exists")]
        public async Task<bool> ProductVariantExists(int id)
        {
            string command = $"SELECT * FROM ProductVariant WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            DataTable data = await dbController.GetData(command);
            return (data.Rows.Count is not 0);
        }
    }
}
