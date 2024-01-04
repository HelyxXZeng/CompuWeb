using CompuWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Globalization;

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

        [HttpGet("GetPromotionWithNameById/{id}")]
        public async Task<IActionResult> GetPromotionWithNameById(int id)
        {
            string GetPromotion = @$"select * from Promotion where Id = {id}";
            using (DataTable data = await DBController.GetInstance().GetData(GetPromotion))
            {
                PromotionWNameDTO Promotion;
                Promotion = new PromotionWNameDTO()
                {
                    Id = (int)data.Rows[0]["Id"],
                    Name = (string)data.Rows[0]["Name"],
                    ProductVariantIdPromotion = (int)data.Rows[0]["ProductVariantIdPromotion"],
                    ProductVariantIdPurchase = (int)data.Rows[0]["ProductVariantIdPurchase"],
                    StartDate = (DateTime)data.Rows[0]["StartDate"],
                    EndDate = (DateTime)data.Rows[0]["EndDate"],
                    Content = (string)data.Rows[0]["Content"],
                    Value = (decimal)data.Rows[0]["Value"],
                    Status = (string)data.Rows[0]["Status"],
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
                return Ok(Promotion);
            }
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
            string GetConfirm = $"select Count(Id) from Staff";
            await DBController.GetInstance().GetCount(GetConfirm);
            return Ok();
        }

        [HttpPut("SetDeletePromotion/{Id}")]
        public async Task<IActionResult> SetDeletePromotion(int Id)
        {
            string UpdateInactive = $"update Promotion set Status = 'CANCELED' where Id = {Id}";
            DBController.GetInstance().UpdateData(UpdateInactive);
            string GetConfirm = $"select Count(Id) from Promotion";
            await DBController.GetInstance().GetCount(GetConfirm);
            return Ok();
        }

        [HttpGet("CustomerStatitics/{date}")]
        public async Task<IActionResult> CustomerStatitics(string date)
        {
            List<string> months = new List<string>() { "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" };
            string GetCustomerCount = $"select count(Id) from Customer";
            Stats stats = new Stats()
            {
                Count = await DBController.GetInstance().GetCount(GetCustomerCount),
                Lists = new List<CusByMonth>(),
            };
            DateTime startDate = Convert.ToDateTime(date);
            DateTime endDate = startDate.AddMonths(-6); // Get date six months ago

            for (DateTime currentMonth = endDate; currentMonth < startDate; currentMonth = currentMonth.AddMonths(1))
            {
                string GetCusNumByMonth = $"SELECT COUNT(Id) FROM Customer WHERE Month(JoinDate) = {currentMonth.Month} AND Year(JoinDate) = {currentMonth.Year}";
                int count = await DBController.GetInstance().GetCount(GetCusNumByMonth);

                string previousPercent = "?%";
                if (stats.Lists.Count > 0 && stats.Lists.Last().Number != 0)
                {
                    previousPercent = $"{((count - stats.Lists.Last().Number) * 100 / stats.Lists.Last().Number).ToString("0.00")}%";
                }

                var list = new CusByMonth()
                {
                    Number = count,
                    Month = $"{currentMonth.Year}-{currentMonth.Month}",
                };
                stats.Percent = (stats.Lists.Count == 0 || stats.Lists.Last().Number == 0) ? "0.00" : previousPercent;
                stats.Lists.Add(list);
            }
            return Ok(stats);
        }
    }
    public class CusByMonth
    {
        public CusByMonth() { }
        public int Number { get; set; }
        public string Month { get; set; }
    }
    public class Stats
    {
        public Stats() { }
        public int Count { get; set; }
        public string Percent { get; set; }
        public List<CusByMonth> Lists { get; set; }
    }
}
