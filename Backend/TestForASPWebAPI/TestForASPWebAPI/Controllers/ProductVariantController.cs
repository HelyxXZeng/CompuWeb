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
        [HttpGet("GetProductVariants")]
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
        [HttpGet("GetProductVariantById/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            DBController dbController = DBController.GetInstance();

            string command = @$"select * from ProductVariant where Id = {id}";
            var dataTable = await dbController.GetData(command);

            if (dataTable.Rows.Count is 0)
                return NotFound("Not Exists!");

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var Specifications = new List<Specification>();

                string GetProductSpecCommand = @$"select * from ProductSpecification where ProductVariantId = {id}";
                
                using (var data = await dbController.GetData(GetProductSpecCommand))
                {
                    foreach (DataRow row in data.Rows)
                    {
                        string GetSpecCommand = $"select * from Specification where Id = {(int)row["SpecificationId"]}";
                        using (var SpecTable = await dbController.GetData(GetSpecCommand))
                        {
                            foreach (DataRow Row in SpecTable.Rows)
                            {
                                var Specification = new Specification()
                                {
                                    Id = (int)Row["Id"],
                                    SpecificationTypeId = (int)Row["SpecificationTypeId"],
                                    Value = (string)Row["Value"],
                                };
                                Specifications.Add(Specification);
                            }
                        }
                    }
                }

                var ProductVariant = new ProductVariant()
                {
                    Id = (int)dataRow["Id"],
                    ProductLineId = (int)dataRow["ProductLineId"],
                    Name = (string)dataRow["Name"],
                    Specifications = Specifications,
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
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!await ProductVariantExists(id)) { return NotFound("Variant not found!"); }

            string command = $"DELETE FROM ProductVariant WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.DeleteData(command);

            return NoContent();
        }
        [HttpGet("Exists/{id}")]
        public async Task<bool> ProductVariantExists(int id)
        {
            string command = $"SELECT * FROM ProductVariant WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            DataTable data = await dbController.GetData(command);
            return (data.Rows.Count is not 0);
        }
    }
}
