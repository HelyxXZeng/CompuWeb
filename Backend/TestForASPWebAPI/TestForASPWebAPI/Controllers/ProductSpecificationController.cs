using CompuWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestForASPWebAPI.Controllers
{
    [Route("api/productspecifications")]
    [ApiController]
    public class ProductSpecificationController : ControllerBase
    {
        private readonly ILogger<ProductSpecificationController> _logger;
        public ProductSpecificationController(ILogger<ProductSpecificationController> logger)
        {
            _logger = logger;
        }
        // GET: api/<ValuesController>
        [HttpGet("GetProductSpecification")]
        public async Task<IActionResult> GetProductSpecifications()
        {
            DBController dbController = DBController.GetInstance();
            //var dataTable = new DataTable();

            string command = @$"select * from ProductSpecification";
            var dataTable = await dbController.GetData(command);

            var ProductSpecifications = new List<ProductSpecification>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var ProductSpecification = new ProductSpecification()
                {
                    Id = (int)dataRow["Id"],
                    ProductVariantId = (int)dataRow["ProductVariantId"],
                    SpecificationId = (int)dataRow["SpecificationId"],
                };
                ProductSpecifications.Add(ProductSpecification);
            }

            return Ok(ProductSpecifications);
        }

        // GET api/<ValuesController>/5
        [HttpGet("GetProductSpecificationById")]
        public async Task<IActionResult> Get(int id)
        {
            DBController dbController = DBController.GetInstance();

            string command = @$"select * from ProductSpecification where Id = {id}";
            var dataTable = await dbController.GetData(command);

            var ProductSpecifications = new List<ProductSpecification>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var ProductSpecification = new ProductSpecification()
                {
                    Id = (int)dataRow["Id"],
                    ProductVariantId = (int)dataRow["ProductVariantId"],
                    SpecificationId = (int)dataRow["SpecificationId"],
                };
                return Ok(ProductSpecification);
            }
            return NotFound("Not Exists!");
        }

        [HttpPost("Insert")]
        public void Insert([FromBody] ProductSpecification value)
        {
            string command = $"INSERT INTO ProductSpecification (ProductVariantId, SpecificationId) VALUES ({value.ProductVariantId}, {value.SpecificationId})";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // PUT api/<ValuesController>/5
        [HttpPut("Update")]
        public void Put(int id, [FromBody] ProductSpecification value)
        {
            string command = $"UPDATE ProductSpecification SET ProductVariantId = {value.ProductVariantId}, SpecificationId = {value.SpecificationId} WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("Delete")]
        public void Delete(int id)
        {
            string command = $"DELETE FROM ProductSpecification WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.DeleteData(command);
            return;
        }
        [HttpGet("Exists")]
        public async Task<bool> ProductSpecificationExists(int id)
        {
            string command = $"SELECT * FROM ProductSpecification WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            DataTable data = await dbController.GetData(command);
            return (data.Rows.Count is not 0);
        }
    }
}
