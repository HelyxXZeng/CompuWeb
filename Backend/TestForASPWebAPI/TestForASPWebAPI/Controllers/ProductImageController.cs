using CompuWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestForASPWebAPI.Controllers
{
    [Route("api/productimages")]
    [ApiController]
    public class ProductImageController : ControllerBase
    {
        private readonly ILogger<ProductImageController> _logger;
        public ProductImageController(ILogger<ProductImageController> logger)
        {
            _logger = logger;
        }
        // GET: api/<ValuesController>
        [HttpGet("GetProductImage")]
        public async Task<IActionResult> GetProductImage()
        {
            DBController dbController = DBController.GetInstance();
            //var dataTable = new DataTable();

            string command = @$"select * from ProductImage";
            var dataTable = await dbController.GetData(command);

            var ProductImages = new List<ProductImage>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var ProductImage = new ProductImage()
                {
                    Id = (int)dataRow["Id"],
                    ProductVariantId = (int)dataRow["ProductVariantId"],
                    Name = (string)dataRow["Name"],
                    Image = (string)dataRow["Url"],
                };
                ProductImages.Add(ProductImage);
            }

            return Ok(ProductImages);
        }

        // GET api/<ValuesController>/5
        [HttpGet("GetProductImageById")]
        public async Task<IActionResult> Get(int id)
        {
            DBController dbController = DBController.GetInstance();

            string command = @$"select * from ProductImage where Id = {id}";
            var dataTable = await dbController.GetData(command);

            var ProductImages = new List<ProductImage>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var ProductImage = new ProductImage()
                {
                    Id = (int)dataRow["Id"],
                    ProductVariantId = (int)dataRow["ProductVariantId"],
                    Name = (string)dataRow["Name"],
                    Image = (string)dataRow["Url"],
                };
                ProductImages.Add(ProductImage);
            }

            return Ok(ProductImages);
        }

        [HttpPost("Insert")]
        public void Insert([FromBody] ProductImage value)
        {
            string command = $"INSERT INTO ProductImage (ProductVariantId, Name, Url) VALUES ({value.ProductVariantId}, '{value.Name}', '{value.Image}')";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // PUT api/<ValuesController>/5
        [HttpPut("Update")]
        public void Put(int id, [FromBody] ProductImage value)
        {
            string command = $"UPDATE ProductImage SET ProductVariantId = {value.ProductVariantId}, Name = '{value.Name}', Url = '{value.Image}' WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("Delete")]
        public void Delete(int id)
        {
            string command = $"DELETE FROM ProductImage WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.DeleteData(command);
            return;
        }
        [HttpGet("Exists")]
        public async Task<bool> ProductImageExists(int id)
        {
            string command = $"SELECT * FROM ProductImage WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            DataTable data = await dbController.GetData(command);
            return (data.Rows.Count is not 0);
        }
    }
}
