using CompuWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Globalization;
using System.Runtime.InteropServices;

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
                Customers = new List<StatByMonth>(),
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

                var customer = new StatByMonth()
                {
                    Number = count,
                    Month = $"{currentMonth.Year}-{currentMonth.Month}",
                };
                stats.Percent = (stats.Customers.Count == 0 || stats.Customers.Last().Number == 0) ? "0.00%" : previousPercent;
                stats.Customers.Add(customer);
            }
            return Ok(stats);
        }

        [HttpGet("RatingStatitics/{date}")]
        public async Task<IActionResult> RatingStatitics(string date)
        {
            string GetCustomerCount = $"select count(Id) from Rating";
            Stats stats = new Stats()
            {
                Count = await DBController.GetInstance().GetCount(GetCustomerCount),
                Customers = new List<StatByMonth>(),
            };
            DateTime startDate = Convert.ToDateTime(date);
            DateTime endDate = startDate.AddMonths(-6); // Get date six months ago

            for (DateTime currentMonth = endDate; currentMonth < startDate; currentMonth = currentMonth.AddMonths(1))
            {
                string GetCusNumByMonth = $"SELECT COUNT(Id) FROM Rating WHERE Month(Date) = {currentMonth.Month} AND Year(Date) = {currentMonth.Year}";
                int count = await DBController.GetInstance().GetCount(GetCusNumByMonth);

                string previousPercent = "?%";
                if (stats.Customers.Count > 0 && stats.Customers.Last().Number != 0)
                {
                    previousPercent = $"{((count - stats.Customers.Last().Number) * 100 / stats.Customers.Last().Number).ToString("0.00")}%";
                }

                var customer = new StatByMonth()
                {
                    Number = count,
                    Month = $"{currentMonth.Year}-{currentMonth.Month}",
                };
                stats.Percent = (stats.Customers.Count == 0 || stats.Customers.Last().Number == 0) ? "0.00%" : previousPercent;
                stats.Customers.Add(customer);
            }
            return Ok(stats);
        }

        [HttpGet("OrderStatitics/{date}")]
        public async Task<IActionResult> OrderStatitics(string date)
        {
            string GetCustomerCount = $"select count(Id) from Orders where Status = 'COMPLETED'";
            Stats stats = new Stats()
            {
                Count = await DBController.GetInstance().GetCount(GetCustomerCount),
                Customers = new List<StatByMonth>(),
            };
            DateTime startDate = Convert.ToDateTime(date);
            DateTime endDate = startDate.AddMonths(-6); // Get date six months ago

            for (DateTime currentMonth = endDate; currentMonth < startDate; currentMonth = currentMonth.AddMonths(1))
            {
                string GetCusNumByMonth = $"SELECT COUNT(Id) FROM Orders WHERE Month(Date) = {currentMonth.Month} AND Year(Date) = {currentMonth.Year} AND Status = 'COMPLETED'";
                int count = await DBController.GetInstance().GetCount(GetCusNumByMonth);

                string previousPercent = "?%";
                if (stats.Customers.Count > 0 && stats.Customers.Last().Number != 0)
                {
                    previousPercent = $"{((count - stats.Customers.Last().Number) * 100 / stats.Customers.Last().Number).ToString("0.00")}%";
                }

                var customer = new StatByMonth()
                {
                    Number = count,
                    Month = $"{currentMonth.Year}-{currentMonth.Month}",
                };
                stats.Percent = (stats.Customers.Count == 0 || stats.Customers.Last().Number == 0) ? "0.00%" : previousPercent;
                stats.Customers.Add(customer);
            }
            return Ok(stats);
        }

        [HttpGet("RevenueStatiticsByMonth/{date}")]
        public async Task<IActionResult> RevenueStatiticsByMonth(string date)
        {
            string GetTotalRevenue = $"SELECT SUM(Total) FROM Orders WHERE Status = 'COMPLETED'";
            Stats stats = new Stats()
            {
                Count = await DBController.GetInstance().GetCount(GetTotalRevenue),
                Customers = new List<StatByMonth>(),
            };

            DateTime selectedDate = Convert.ToDateTime(date);
            DateTime startDate = selectedDate.AddDays(-(int)selectedDate.DayOfWeek); // Start of the week
            DateTime endDate = startDate.AddDays(6); // End of the week

            for (DateTime currentDate = startDate; currentDate <= endDate; currentDate = currentDate.AddDays(1))
            {
                string GetRevenueByDay = $"SELECT SUM(Total) FROM Orders WHERE Date = '{currentDate.ToString("yyyy-MM-dd")}' AND Status = 'COMPLETED'";
                int revenue = await DBController.GetInstance().GetCount(GetRevenueByDay);

                string previousPercent = "?%";
                if (stats.Customers.Count > 0 && stats.Customers.Last().Number != 0)
                {
                    previousPercent = $"{((revenue - stats.Customers.Last().Number) * 100 / stats.Customers.Last().Number).ToString("0.00")}%";
                }

                var customer = new StatByMonth()
                {
                    Number = revenue,
                    Month = $"{currentDate.Year}-{currentDate.Month}-{currentDate.Day}",
                };

                stats.Percent = (stats.Customers.Count == 0 || stats.Customers.Last().Number == 0) ? "0.00%" : previousPercent;
                stats.Customers.Add(customer);
            }

            return Ok(stats);
        }

        [HttpGet("FailedOrderStatitics/{date}")]
        public async Task<IActionResult> FailedOrderStatitics(string date)
        {
            string GetCustomerCount = $"select count(Id) from Orders where Status = 'CANCELED' or Status = 'DECLINED'";
            Stats stats = new Stats()
            {
                Count = await DBController.GetInstance().GetCount(GetCustomerCount),
                Customers = new List<StatByMonth>(),
            };
            DateTime startDate = Convert.ToDateTime(date);
            DateTime endDate = startDate.AddMonths(-6); // Get date six months ago

            for (DateTime currentMonth = endDate; currentMonth < startDate; currentMonth = currentMonth.AddMonths(1))
            {
                string GetCusNumByMonth = $"SELECT COUNT(Id) FROM Orders WHERE Month(Date) = {currentMonth.Month} AND Year(Date) = {currentMonth.Year} AND (Status = 'CANCELED' or Status = 'DECLINED')";
                int count = await DBController.GetInstance().GetCount(GetCusNumByMonth);

                string previousPercent = "?%";
                if (stats.Customers.Count > 0 && stats.Customers.Last().Number != 0)
                {
                    previousPercent = $"{((count - stats.Customers.Last().Number) * 100 / stats.Customers.Last().Number).ToString("0.00")}%";
                }

                var customer = new StatByMonth()
                {
                    Number = count,
                    Month = $"{currentMonth.Year}-{currentMonth.Month}",
                };
                stats.Percent = (stats.Lists.Count == 0 || stats.Lists.Last().Number == 0) ? "0.00" : previousPercent;
                stats.Lists.Add(list);
            }
            return Ok(stats);
        }

        [HttpGet("ReturnOrderStatitics/{date}")]
        public async Task<IActionResult> ReturnOrderStatitics(string date)
        {
            string GetCustomerCount = $"select count(Id) from ReturnOrderItem where Status = 'COMPLETED'";
            Stats stats = new Stats()
            {
                Count = await DBController.GetInstance().GetCount(GetCustomerCount),
                Customers = new List<StatByMonth>(),
            };
            DateTime startDate = Convert.ToDateTime(date);
            DateTime endDate = startDate.AddMonths(-6); // Get date six months ago

            for (DateTime currentMonth = endDate; currentMonth < startDate; currentMonth = currentMonth.AddMonths(1))
            {
                string GetCusNumByMonth = $"SELECT COUNT(Id) FROM ReturnOrderItem WHERE Month(Date) = {currentMonth.Month} AND Year(Date) = {currentMonth.Year} AND Status = 'COMPLETED'";
                int count = await DBController.GetInstance().GetCount(GetCusNumByMonth);

                string previousPercent = "?%";
                if (stats.Customers.Count > 0 && stats.Customers.Last().Number != 0)
                {
                    previousPercent = $"{((count - stats.Customers.Last().Number) * 100 / stats.Customers.Last().Number).ToString("0.00")}%";
                }

                var customer = new StatByMonth()
                {
                    Number = count,
                    Month = $"{currentMonth.Year}-{currentMonth.Month}",
                };
                stats.Percent = (stats.Customers.Count == 0 || stats.Customers.Last().Number == 0) ? "0.00%" : previousPercent;
                stats.Customers.Add(customer);
            }
            return Ok(stats.Customers);
        }

        [HttpGet("PromotionStatitics/{date}")]
        public async Task<IActionResult> PromotionStatitics(int id, string date)
        {
            if (!DateTime.TryParse(date, out DateTime inputDate))
            {
                return BadRequest("Invalid date format. Please use yyyy-MM-dd format.");
            }

            List<(string Date, int OrderCount, int ItemCount)> orderCounts = new List<(string, int, int)>();

            string command = @$"select * from Promotion where Id = {id}";
            var dataTable = await DBController.GetInstance().GetData(command);

            var promotion = new Promotion();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                promotion = new Promotion()
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
            }

            if (promotion == null)
            {
                return NotFound("Promotion not found.");
            }

            // Determine the end date to compare
            DateTime endDateToCompare = inputDate <= promotion.EndDate ? inputDate : promotion.EndDate;

            // Loop through each day and fetch order counts for that day
            for (DateTime currentDate = promotion.StartDate; currentDate <= endDateToCompare; currentDate = currentDate.AddDays(1))
            {
                string query = $"SELECT COUNT(DISTINCT o.Id) AS OrdersWithPromotion " +
                               $"FROM Orders o " +
                               $"INNER JOIN OrderItem oi ON o.Id = oi.OrderId " +
                               $"INNER JOIN Promotion p ON oi.PromotionId = p.Id " +
                               $"WHERE oi.PromotionId = {id} " +
                               $"AND o.Date = '{currentDate:yyyy-MM-dd}'";

                int count = await DBController.GetInstance().GetCount(query);

                query = $"SELECT COUNT(DISTINCT oi1.Id) " +
                               $"FROM OrderItem oi1 " +
                               $"INNER JOIN Orders o ON o.Id = oi1.OrderId " +
                               $"INNER JOIN OrderItem oi ON o.Id = oi.OrderId " +
                               $"INNER JOIN Promotion p ON oi.PromotionId = p.Id " +
                               $"WHERE oi.PromotionId = {id} " +
                               $"AND o.Date = '{currentDate:yyyy-MM-dd}'";
                int ItemCount = await DBController.GetInstance().GetCount(query);
                
                orderCounts.Add((Date: currentDate.ToString("yyyy-MM-dd"), OrderCount: count, ItemCount: ItemCount));
            }
            var serializedCounts = orderCounts.Select(x => new { x.Date, x.OrderCount, x.ItemCount }).ToList();
            return Ok(serializedCounts);
        }

        [HttpGet("StaffStatitics/{staffid}")]
        public async Task<IActionResult> StaffStatitics(int staffid)
        {
            List<(string Date, int OrderCount, decimal ItemCount)> orderCounts = new List<(string, int, decimal)>();

            // Determine the end date to compare
            DateTime endDateToCompare = DateTime.Today.AddMonths(-1);

            // Loop through each day and fetch order counts for that day
            for (DateTime currentDate = DateTime.Today; currentDate >= endDateToCompare; currentDate = currentDate.AddDays(-1))
            {
                string query = $"SELECT COUNT(DISTINCT o.Id) AS OrdersWithPromotion " +
                               $"FROM Orders o " +
                               $"WHERE o.CustomerId = {staffid} " +
                               $"AND CONVERT(DATE, o.Date) = '{currentDate:yyyy-MM-dd}'";

                int count = await DBController.GetInstance().GetCount(query);

                query = $"SELECT SUM(o.Total) AS Total " +
                               $"FROM Orders o " +
                               $"WHERE o.CustomerId = {staffid} " +
                               $"AND CONVERT(DATE, o.Date) = '{currentDate:yyyy-MM-dd}'";
                decimal ItemCount;
                using (DataTable data = await DBController.GetInstance().GetData(query))
                {
                    ItemCount = data.Rows[0]["Total"] == DBNull.Value ? 0 : (decimal)data.Rows[0]["Total"];
                }

                orderCounts.Add((Date: currentDate.ToString("yyyy-MM-dd"), OrderCount: count, ItemCount: ItemCount));
            }
            var serializedCounts = orderCounts.Select(x => new { x.Date, x.OrderCount, x.ItemCount }).ToList();
            return Ok(serializedCounts);
        }
    }
    public class StatByMonth
    {
        public StatByMonth() { }
        public int Number { get; set; }
        public string Month { get; set; }
    }
    public class Stats
    {
        public Stats() { }
        public int Count { get; set; }
        public string Percent { get; set; }
        public List<StatByMonth> Customers { get; set; }
    }
}
