using CompuWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestForASPWebAPI.Controllers
{
    [Route("api/productinstances")]
    [ApiController]
    public class ProductInstanceController : ControllerBase
    {
        private readonly ILogger<ProductInstanceController> _logger;
        public ProductInstanceController(ILogger<ProductInstanceController> logger)
        {
            _logger = logger;
        }
        // GET: api/<ValuesController>
        [HttpGet("GetProductInstances")]
        public async Task<IActionResult> GetProductInstances()
        {
            DBController dbController = DBController.GetInstance();
            //var dataTable = new DataTable();

            string command = @$"select * from ProductInstance";
            var dataTable = await dbController.GetData(command);

            var ProductInstances = new List<ProductInstance>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var ProductInstance = new ProductInstance()
                {
                    Id = (int)dataRow["Id"],
                    ProductVariantId = (int)dataRow["ProductVariantId"],
                    SerialNumber = (string)dataRow["SerialNumber"],
                    Status = (string)dataRow["Status"],
                    Available = (bool)dataRow["Available"],
                };
                ProductInstances.Add(ProductInstance);
            }

            return Ok(ProductInstances);
        }

        // GET api/<ValuesController>/5
        [HttpGet("GetProductInstanceById")]
        public async Task<IActionResult> Get(int id)
        {
            DBController dbController = DBController.GetInstance();

            string command = @$"select * from ProductInstance where Id = {id}";
            var dataTable = await dbController.GetData(command);

            var ProductInstances = new List<ProductInstance>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var ProductInstance = new ProductInstance()
                {
                    Id = (int)dataRow["Id"],
                    ProductVariantId = (int)dataRow["ProductVariantId"],
                    SerialNumber = (string)dataRow["SerialNumber"],
                    Status = (string)dataRow["Status"],
                    Available = (bool)dataRow["Available"],
                };
                return Ok(ProductInstance);
            }
            return NotFound("Not Exists!");
        }

        [HttpPost("Insert")]
        public void Insert([FromBody] ProductInstance value)
        {
            string command = $"INSERT INTO ProductInstance (ProductVariantId, SerialNumber, Status, Available) VALUES ({value.ProductVariantId}, '{value.SerialNumber}', N'{value.Status}', {(value.Available? "1" : "0")})";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // PUT api/<ValuesController>/5
        [HttpPut("Update")]
        public void Put(int id, [FromBody] ProductInstance value)
        {
            string command = $"UPDATE ProductInstance SET ProductVariantId = {value.ProductVariantId}, SerialNumber = '{value.SerialNumber}', Status = N'{value.Status}', Available = {(value.Available ? "1" : "0")} WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("Delete")]
        public void Delete(int id)
        {
            string command = $"DELETE FROM ProductInstance WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.DeleteData(command);
            return;
        }
        [HttpGet("Exists")]
        public async Task<bool> ProductInstanceExists(int id)
        {
            string command = $"SELECT * FROM ProductInstance WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            DataTable data = await dbController.GetData(command);
            return (data.Rows.Count is not 0);
        }
    }
}
