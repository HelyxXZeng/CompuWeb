using CompuWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestForASPWebAPI.Controllers
{
    [Route("api/AdminDTOController")]
    [ApiController]
    public class AdminDTOController : ControllerBase
    {
        private readonly ILogger<AdminDTOController> _logger;
        private readonly HttpClient _httpClient;
        public AdminDTOController(ILogger<AdminDTOController> logger)
        {
            _logger = logger;
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri("https://localhost:44333/");
        }

        [HttpGet("GetProductVariantWOLine")]
        public async Task<IActionResult> GetProductVariantWOLine()
        {
            List<ProductVariant> variants = new List<ProductVariant>();
            string GetPV = $"select * from ProductVariant";
            using (DataTable data = await DBController.GetInstance().GetData(GetPV))
            {
                foreach (DataRow row in data.Rows)
                {
                    var variant = new ProductVariant()
                    {
                        Id = (int)row["Id"],
                        Name = (string)row["Name"],
                    };
                    variants.Add(variant);
                }
            }
            return Ok(variants);
        }

        [HttpGet("GetPromotionTableWithName")]
        public async Task<IActionResult> GetPromotionTableWithName()
        {
            string GetPromotion = @$"select * from Promotion";

            var Promotions = new List<PromotionWNameDTO>();
            using (DataTable data = await DBController.GetInstance().GetData(GetPromotion))
            {
                foreach (DataRow dataRow in data.Rows)
                {
                    var Promotion = new PromotionWNameDTO()
                    {
                        Id = (int)dataRow["Id"],
                        Name = (string)dataRow["Name"],
                        ProductVariantIdPromotion = (int)dataRow["ProductVariantIdPromotion"],
                        ProductVariantIdPurchase = (int)dataRow["ProductVariantIdPurchase"],
                        StartDate = (DateTime)dataRow["StartDate"],
                        EndDate = (DateTime)dataRow["EndDate"],
                        Content = (string)dataRow["Content"],
                        Value = (decimal)dataRow["Value"],
                        Status = (string)dataRow["Status"],
                    }; 
                    string GetPVPromoName = $"select Name from ProductVariant where Id = {Promotion.ProductVariantIdPromotion}";
                    using (DataTable dt = await DBController.GetInstance().GetData(GetPVPromoName))
                    {
                        Promotion.ProductVariantNamePromotion = (string)dt.Rows[0]["Name"];
                    }
                    string GetPVPurchaseName = $"select Name from ProductVariant where Id = {Promotion.ProductVariantIdPurchase}";
                    using (DataTable dt = await DBController.GetInstance().GetData(GetPVPurchaseName))
                    {
                        Promotion.ProductVariantNamePurchase = (string)dt.Rows[0]["Name"];
                    }
                    Promotions.Add(Promotion);
                }
            }
            return Ok(Promotions);
        }

        [HttpGet("CustomerSpentStatitics")]
        public async Task<IActionResult> CustomerSpentStatitics()
        {
            List<CustomerStats> customers = new List<CustomerStats>();
            string GetCustomerStats = $"select top 10 c.Id, c.Name, c.PhoneNumber, Sum(o.Total) as Total\r\nfrom Customer c\r\njoin Orders o on o.CustomerId = c.Id\r\nwhere c.Id = 1\r\ngroup by c.Id, c.Name, c.PhoneNumber\r\norder by Total desc";
            using (DataTable data = await DBController.GetInstance().GetData(GetCustomerStats))
            {
                foreach (DataRow row in data.Rows)
                {
                    var customerStats = new CustomerStats()
                    {
                        Name = (string)row["Name"],
                        PhoneNumber = (string)row["PhoneNumber"],
                        Total = (decimal)row["Total"],
                    };
                    customers.Add(customerStats);
                }
            }
            return Ok(customers);
        }

        [HttpPut("SetDeleteStaff/{Id}")]
        public async Task<IActionResult> SetDeleteStaff(int Id)
        {
            string UpdateInactive = $"update Staff set Other = 'INACTIVE' where Id = {Id}";
            DBController.GetInstance().UpdateData(UpdateInactive);
            return Ok();
        }

        [HttpPut("SetDeletePromotion/{Id}")]
        public async Task<IActionResult> SetDeletePromotion(int Id)
        {
            string UpdateInactive = $"update Staff set Status = 'INACTIVE' where Id = {Id}";
            DBController.GetInstance().UpdateData(UpdateInactive);
            return Ok();
        }

        [HttpGet("CustomerStatitics/{year}")]
        public async Task<IActionResult> CustomerStatitics(int year)
        {
            List<string> months = new List<string>() { "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" };
            List<CusByMonth> Customers = new List<CusByMonth>();
            for (int i = 1; i <= 12; i++)
            {
                string GetCusNumByMonth = $"select count(Id) from Customer where Month(JoinDate) = {i} and Year(JoinDate) = {year}";
                int count = await DBController.GetInstance().GetCount(GetCusNumByMonth);
                var customer = new CusByMonth()
                {
                    Number = count,
                    Month = months[i - 1],
                    Percent = (i == 1) ? "0.00%" : (Customers[i - 2].Number == 0 ? "?%" : $"{((count - Customers[i - 2].Number) * 100 / Customers[i - 2].Number).ToString("0.00")}%"),
                };
                Customers.Add(customer);
            }
            return Ok(Customers);
        }
    }
    public class CusByMonth
    {
        public CusByMonth() { }
        public int Number { get; set; }
        public string Month { get; set; }
        public string Percent { get; set; }
    }
}
