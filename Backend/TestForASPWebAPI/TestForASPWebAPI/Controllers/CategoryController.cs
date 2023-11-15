using CompuWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Runtime.CompilerServices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestForASPWebAPI.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ILogger<CategoryController> _logger;
        public CategoryController(ILogger<CategoryController> logger)
        {
            _logger = logger;
        }
        // GET: api/<ValuesController>
        [HttpGet("GetCategories")]
        public async Task<IActionResult> GetCategories()
        {
            DBController dbController = DBController.GetInstance();
            //var dataTable = new DataTable();

            string command = @$"select * from Category";
            var dataTable = await dbController.GetData(command);

            var categories = new List<Category>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var category = new Category()
                {
                    Id = (int)dataRow["Id"],
                    Name = (string)dataRow["Name"]
                };
                categories.Add(category);
            }

            return Ok(categories);
        }

        // GET api/<ValuesController>/5
        [HttpGet("GetCategoryById")]
        public async Task<IActionResult> Get(int id)
        {
            DBController dbController = DBController.GetInstance();

            string command = @$"select * from Category where Id = {id}";
            var dataTable = await dbController.GetData(command);

            var categories = new List<Category>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var category = new Category()
                {
                    Id = (int)dataRow["Id"],
                    Name = (string)dataRow["Name"]
                };
                categories.Add(category);
            }

            return Ok(categories);
        }

        [HttpPost("Insert")]
        public IActionResult Insert(Category value)
        {
            if (value == null) { return BadRequest("Invalid Data!"); }

            string command = $"INSERT INTO Category (Name) VALUES ('{value.Name}')";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);

            return NoContent();
        }

        // PUT api/<ValuesController>/5
        [HttpPut("Update")]
        public async Task<IActionResult> Put(int id, [FromBody] Category value)
        {
            if(!await CategoryExists(id)) { return NotFound("Category not found!"); }

            string command = $"UPDATE Category SET Name = '{value.Name}' WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.UpdateData(command);

            return NoContent();
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!await CategoryExists(id)) { return NotFound("Category not found!"); }

            string command = $"DELETE FROM Category WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            dbController.DeleteData(command);

            return NoContent();
        }
        [HttpGet("Exists")]
        public async Task<bool> CategoryExists(int id)
        {
            string command = $"SELECT * FROM Category WHERE Id = {id}";
            DBController dbController = DBController.GetInstance();
            DataTable data = await dbController.GetData(command);
            return (data.Rows.Count is not 0);
        }

        /*[HttpGet("Search")]
        public string Search()
        {
            List<string> names = new List<string>() { "John", "Jane", "Jack", "Jill", "Jim" };
            string searchName = "Jn";

            foreach (string name in names)
            {
                int distance = LevenshteinDistance(name, searchName);
                double accuracy = (1 - ((double)distance / (double)searchName.Length)) * 100;

                if (accuracy >= 60)
                {
                    return name;
                }
            }
            return searchName;
        }
        [HttpGet("NotSearch")]
        public int LevenshteinDistance(string s, string t)
        {
            int n = s.Length;
            int m = t.Length;
            int[,] d = new int[n + 1, m + 1];

            if (n == 0)
            {
                return m;
            }

            if (m == 0)
            {
                return n;
            }

            for (int i = 0; i <= n; i++)
            {
                d[i, 0] = i;
            }

            for (int j = 0; j <= m; j++)
            {
                d[0, j] = j;
            }

            for (int j = 1; j <= m; j++)
            {
                for (int i = 1; i <= n; i++)
                {
                    int cost = (s[i - 1] == t[j - 1]) ? 0 : 1;

                    d[i, j] = Math.Min(Math.Min(d[i - 1, j] + 1, d[i, j - 1] + 1), d[i - 1, j - 1] + cost);
                }
            }

            return d[n, m];
        }*/
    }
}
