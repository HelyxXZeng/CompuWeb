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
    }
}
