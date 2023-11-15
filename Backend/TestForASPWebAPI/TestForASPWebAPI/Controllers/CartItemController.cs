using CompuWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestForASPWebAPI.Controllers
{
    [Route("api/cartitems")]
    [ApiController]
    public class CartItemController : ControllerBase
    {
        private readonly ILogger<CartItemController> _logger;
        public CartItemController(ILogger<CartItemController> logger)
        {
            _logger = logger;
        }
        // GET: api/<ValuesController>
        [HttpGet("GetCartItems")]
        public async Task<IActionResult> GetCartItems()
        {
            DBController dbController = DBController.GetInstance();
            //var dataTable = new DataTable();

            string command = @$"select * from CartItem";
            var dataTable = await dbController.GetData(command);

            var CartItems = new List<CartItem>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var CartItem = new CartItem()
                {
                    Id = (int)dataRow["Id"],
                    ProductVariantId = (int)dataRow["ProductVariantId"],
                    CustomerId = (int)dataRow["CustomerId"],
                    Quantity = (int)dataRow["Quantity"],
                };
                CartItems.Add(CartItem);
            }

            return Ok(CartItems);
        }

        // GET api/<ValuesController>/5
        [HttpGet("GetCartItemById")]
        public async Task<IActionResult> Get(int id)
        {
            DBController dbController = DBController.GetInstance();

            string command = @$"select * from CartItem where Id = {id}";
            var dataTable = await dbController.GetData(command);

            var CartItems = new List<CartItem>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var CartItem = new CartItem()
                {
                    Id = (int)dataRow["Id"],
                    ProductVariantId = (int)dataRow["ProductVariantId"],
                    CustomerId = (int)dataRow["CustomerId"],
                    Quantity = (int)dataRow["Quantity"],
                };
                CartItems.Add(CartItem);
            }

            return Ok(CartItems);
        }

        [HttpPost("Insert")]
        public void Insert([FromBody] CartItem value)
        {
            string command = $"INSERT INTO CartItem (ProductVariantId, CustomerId, Quantity) VALUES ({value.ProductVariantId}, {value.CustomerId}, {value.Quantity})";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // PUT api/<ValuesController>/5
        [HttpPut("Update")]
        public void Put(int id, [FromBody] CartItem value)
        {
            string command = $"UPDATE CartItem SET ProductVariantId = {value.ProductVariantId}, CustomerId = {value.CustomerId}, Quantity = {value.Quantity} WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);
            return;
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("Delete")]
        public void Delete(int id)
        {
            string command = $"DELETE FROM CartItem WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.DeleteData(command);
            return;
        }
        [HttpGet("Exists")]
        public async Task<bool> CartItemExists(int id)
        {
            string command = $"SELECT * FROM CartItem WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            DataTable data = await dbController.GetData(command);
            return (data.Rows.Count is not 0);
        }
    }
}
