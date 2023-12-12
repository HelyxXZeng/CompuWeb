using CompuWeb.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Validations;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Data;
using System.Globalization;
using System.Runtime.InteropServices;
using System.Xml.Linq;
using TestForASPWebAPI.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestForASPWebAPI.Controllers
{
    [Route("api/DTOController")]
    [ApiController]
    public class DTOController : ControllerBase
    {
        private readonly ILogger<DTOController> _logger;
        private readonly HttpClient _httpClient;
        public DTOController(ILogger<DTOController> logger)
        {
            _logger = logger;
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri("https://localhost:44333/");
        }
        
        [HttpGet("GetProductTable")]
        public async Task<IActionResult> GetProductVariantDTO()
        {
            DBController dbController = DBController.GetInstance();

            string command = @$"select * from ProductVariant";
            var dataTable = await dbController.GetData(command);
            if (dataTable is null) { return Ok(); }

            var ProductVariants = new List<ProductVariant>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var ProductVariant = new ProductVariant()
                {
                    Id = (int)dataRow["Id"],
                    Name = (string)dataRow["Name"],
                    ProductLineId = (int)dataRow["ProductLineId"],
                };
                ProductVariants.Add(ProductVariant);
            }
            var ProductTable = new List<ProductVariantDTO>();
            foreach (ProductVariant productVariant in ProductVariants)
            {
                string Name = string.Empty;
                string getCategoryIdCommand = $@"select CategoryId from ProductLine where Id = {productVariant.ProductLineId}";
                using (DataTable data = await DBController.GetInstance().GetData(getCategoryIdCommand))
                {
                    if (data.Rows.Count is 0)
                    {
                        break;
                    }

                    string getCategoryNameCommand = $"select Name from Category where Id = {data.Rows[0]["CategoryId"]}";
                    using (DataTable name = await DBController.GetInstance().GetData(getCategoryNameCommand))
                    {
                        Name = (string)name.Rows[0]["Name"];
                    }
                }

                int InstancesCount = 0;
                string getInstanceCount = $@"select count(*) from ProductInstance where ProductVariantId = {productVariant.Id} and Available = 1";
                InstancesCount = await DBController.GetInstance().GetCount(getInstanceCount);

                await PriceController.UpdatePriceStatus();
                decimal Value = 0;
                string GetPriceCommand = @$"select * from Price where Status = 'ACTIVE' and ProductVariantId = {productVariant.Id}";
                using (DataTable data = await DBController.GetInstance().GetData(GetPriceCommand))
                {
                    if (data.Rows.Count is not 0)
                    {
                        Value = (decimal)data.Rows[0]["Value"];
                    }
                }

                var DTO = new ProductVariantDTO()
                {
                    Id = productVariant.Id,
                    Name = productVariant.Name,
                    CategoryName = Name,
                    NumberInStock = InstancesCount,
                    Price = Value,
                };
                ProductTable.Add(DTO);
            }
            return Ok(ProductTable);
        }

        [HttpGet("GetProductLineTable")]
        public async Task<IActionResult> GetProductLineTable()
        {
            DBController dbController = DBController.GetInstance();
            string GetProductLinesCommand = $"select * from ProductLine";
            var productLines = new List<ProductLineDTO>();
            using (DataTable dataTable = await dbController.GetData(GetProductLinesCommand))
            {
                foreach (DataRow dataRow in dataTable.Rows)
                {
                    string CategoryName = string.Empty;
                    string GetCategoryName = $"select Name from Category where Id = {(int)dataRow["CategoryId"]}";
                    using (DataTable data = await dbController.GetData(GetCategoryName))
                    {
                        CategoryName = (string)data.Rows[0]["Name"];
                    }

                    var productLineDTO = new ProductLineDTO()
                    {
                        Id = (int)dataRow["Id"],
                        Name = (string)dataRow["Name"],
                        CategoryName = CategoryName,
                        ReleaseDate = (DateTime)dataRow["ReleaseDate"],
                    };
                    productLines.Add(productLineDTO);
                }
            }
            return Ok(productLines);
        }

        [HttpGet("GetBrandTable")]
        public async Task<IActionResult> GetBrandTable()
        {
            DBController dbController = DBController.GetInstance();

            string command = @$"select Id, Name from Brand";
            var dataTable = await dbController.GetData(command);

            var Brands = new List<Brand>();

            foreach (DataRow dataRow in dataTable.Rows)
            {
                var Brand = new Brand()
                {
                    Id = (int)dataRow["Id"],
                    Name = (string)dataRow["Name"],
                };
                Brands.Add(Brand);
            }
            return Ok(Brands);
        }

        [HttpGet("AuthenticateStaff/{phoneNumber}")]
        public async Task<IActionResult> AuthenticateStaff(string phoneNumber)
        {
            DBController dbController = DBController.GetInstance();
            string GetStaffAuthetication = $"select Id from Staff where PhoneNumber = '{phoneNumber}' and Other = 'ACTIVE'";
            using (DataTable data = await dbController.GetData(GetStaffAuthetication))
            {
                if (data.Rows.Count is 0) return Ok(false);
            }
            return Ok(true);
        }

        [HttpGet("GetStaffAvatar/{phoneNumber}")]
        public async Task<IActionResult> GetStaffAvatar(string phoneNumber)
        {
            DBController dbController = DBController.GetInstance();
            string GetStaffAuthetication = $"select Avatar from Staff where PhoneNumber = '{phoneNumber}'";
            using (DataTable data = await dbController.GetData(GetStaffAuthetication))
            {
                if (data.Rows.Count is 0) return NotFound("Not Exists!");
                return Ok((string)data.Rows[0]["Avatar"]);
            }
        }

        [HttpPost("CreateOrder")]
        public async Task<IActionResult> CreateOrder(int PromotionId, OrderDTO order)
        {
            DBController dbController = DBController.GetInstance();

            string CreateOrderCommand = $"INSERT INTO Orders (CustomerId, StaffId, Date, Note, Status, Address, Total) VALUES ({order.CustomerId}, {order.StaffId}, '{DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")}', N'{order.Note}', '{order.Status}', N'{order.Address}', 0.00)";
            dbController.UpdateData(CreateOrderCommand);

            await PromotionController.UpdatePromotionStatus();
            await PriceController.UpdatePriceStatus();

            string getOrderIdCommand = $"select MAX(Id) from Orders where CustomerId = {order.CustomerId} and StaffId = {order.StaffId}";
            int thisOrderId = await dbController.GetCount(getOrderIdCommand);

            Promotion thisOrderPromotion;
            string GetPromotionCommand = $"select * from Promotion where Id = {PromotionId} and Status = 'ACTIVE'";
            using (DataTable data = await DBController.GetInstance().GetData(GetPromotionCommand))
            {
                thisOrderPromotion = new Promotion()
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
            }

            decimal total = 0;
            foreach (var item in order.orderItems)
            {
                Price thisPrice;
                string getPriceCommand = $"select * from Price where ProductVariantId = {item.ProductVariantId} and Status = 'ACTIVE'";
                using (DataTable data = await DBController.GetInstance().GetData(getPriceCommand))
                {
                    thisPrice = new Price()
                    {
                        Id = (int)data.Rows[0]["Id"],
                        ProductVariantId = (int)data.Rows[0]["ProductVariantId"],
                        StartDate = (DateTime)data.Rows[0]["StartDate"],
                        EndDate = (DateTime)data.Rows[0]["EndDate"],
                        Value = (decimal)data.Rows[0]["Value"],
                        Status = (string)data.Rows[0]["Status"],
                    };
                }

                if (item.ProductVariantId == thisOrderPromotion.ProductVariantIdPurchase)
                {
                    if (thisOrderPromotion.Value < 0)
                    {
                        total += (thisPrice.Value + thisOrderPromotion.Value) * item.Quantity;
                    }
                    else if (thisOrderPromotion.Value >= 0 && thisOrderPromotion.Value <= 100)
                    {
                        total += thisPrice.Value * item.Quantity * (100 - thisOrderPromotion.Value) / 100;
                    }
                    string getProductInstancesCommand = $"select Id from ProductInstance where ProductVariantId = {item.ProductVariantId} and Available = 1";
                    using (DataTable data = await DBController.GetInstance().GetData(getProductInstancesCommand))
                    {
                        for (int i = 0; i < item.Quantity; i++)
                        {
                            string InsertOrderItem = $"insert into OrderItem (ProductInstaceId, OrderId, PriceId, PromotionId) values ({(int)data.Rows[i]["Id"]}, {thisOrderId}, {thisPrice.Id}, {thisOrderPromotion.Id})";
                            dbController.UpdateData(InsertOrderItem);

                            string UpdateInstance = $"update ProductInstance set Available = 0 where Id = {(int)data.Rows[i]["Id"]}";
                            dbController.UpdateData(UpdateInstance);
                        }
                    }
                }
                else
                {
                    total += thisPrice.Value * item.Quantity;
                    string getProductInstancesCommand = $"select Id from ProductInstance where ProductVariantId = {item.ProductVariantId} and Available = 1";
                    using (DataTable data = await DBController.GetInstance().GetData(getProductInstancesCommand))
                    {
                        for (int i = 0; i < item.Quantity; i++)
                        {
                            string InsertOrderItem = $"insert into OrderItem (ProductInstaceId, OrderId, PriceId) values ({(int)data.Rows[i]["Id"]}, {thisOrderId}, {thisPrice.Id})";
                            dbController.UpdateData(InsertOrderItem);

                            string UpdateInstance = $"update ProductInstance set Available = 0 where Id = {(int)data.Rows[i]["Id"]}";
                            dbController.UpdateData(UpdateInstance);
                        }
                    }
                }
            }
            string UpdateTotalforOrder = $"update Orders set Total = {total.ToString("0.00")} where Id = {thisOrderId}";
            dbController.UpdateData(UpdateTotalforOrder);
            return Ok();
        }

        [HttpGet("CheckPromotions")]
        public async Task<IActionResult> CheckPromotions(OrderDTO order)
        {
            await PromotionController.UpdatePromotionStatus();
            List<Promotion> promoList = new List<Promotion>();
            foreach (var orderItem in order.orderItems)
            {
                string getPromotionsCommand = $@"select * from Promotion where ProductVariantIdPurchase = '{orderItem.ProductVariantId}' and Status = 'ACTIVE'";
                DBController dbController = DBController.GetInstance();
                var dataTable = await dbController.GetData(getPromotionsCommand);
                if (dataTable is not null)
                {
                    foreach (DataRow dataRow in dataTable.Rows)
                    {
                        var Promotion = new Promotion()
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
                        if (Promotion.Value == 100) { promoList.Add(Promotion); continue; }
                        foreach (var orderVariant in order.orderItems)
                        {
                            if (orderVariant.ProductVariantId == Promotion.ProductVariantIdPromotion) { promoList.Add(Promotion); }
                        }
                    }
                }
            }
            return Ok(promoList);
        }

        [HttpPost("CreateProductVariant")]
        public async Task<IActionResult> CreateProductVariant(ProductVariantForCreator variants, int Price)
        {
            DBController dbController = DBController.GetInstance();

            string createVariantCommand = $"INSERT INTO ProductVariant (ProductLineId, Name) VALUES ({variants.ProductLineId}, N'{variants.Name}')";
            dbController.UpdateData(createVariantCommand);

            string getThisPVIdCommand = $"select MAX(Id) from ProductVariant where ProductLineId = {variants.ProductLineId} and Name = N'{variants.Name}'";
            int thisPVId = await dbController.GetCount(getThisPVIdCommand);
            variants.Id = thisPVId;

            foreach (var specification in variants.ProductSpecifications)
            {
                string command = $"INSERT INTO ProductSpecification (ProductVariantId, SpecificationId) VALUES ({thisPVId}, {specification.SpecificationId})";
                dbController.UpdateData(command);
            }

            string CreatePriceCommand = $"INSERT INTO Price (ProductVariantId, StartDate, EndDate, Status, Value) VALUES ({thisPVId}, '{DateTime.Now.ToString("yyyy-MM-dd")}', '2030-12-31', 'ACTIVE', {Price.ToString("0.00")})";
            dbController.UpdateData(CreatePriceCommand);

            return Ok(thisPVId);
        }
        
        [HttpPost("CreateProductLine")]
        public async Task<IActionResult> CreateProductLine(ProductLine productLine)
        {
            DBController dbController = DBController.GetInstance();

            string CreateProductLine = $"INSERT INTO ProductLine (CategoryId, BrandId, Name, ReleaseDate, Warranty, Description) VALUES ({productLine.CategoryId}, {productLine.BrandId}, N'{productLine.Name}', '{productLine.ReleaseDate.ToString("yyyy-MM-dd")}', {productLine.Warranty}, N'{productLine.Description}')";
            dbController.UpdateData(CreateProductLine);

            string getThisPVIdCommand = $"select MAX(Id) from ProductLine where CategoryId = {productLine.CategoryId} and BrandId = {productLine.BrandId}";
            int thisPLId = await dbController.GetCount(getThisPVIdCommand);

            foreach (var image in productLine.Images)
            {
                string command = $"INSERT INTO ProductImage (ProductLineId, Name, Url) VALUES ({thisPLId}, N'{image.Name}', N'{image.Image}')";
                dbController.UpdateData(command);
            }
            return Ok();
        }

        [HttpGet("GetLaptopProductTable")]
        public async Task<IActionResult> GetLaptopProductTable()
        {
            HttpResponseMessage response = await _httpClient.GetAsync($"api/DTOController/GetProductTable");
            List<ProductVariantDTO> productVariants;
            if (!response.IsSuccessStatusCode)
            {
                return BadRequest();
            }

            string jsonResponse = await response.Content.ReadAsStringAsync();
            productVariants = JsonConvert.DeserializeObject<List<ProductVariantDTO>>(jsonResponse);
            DBController dBController = DBController.GetInstance();

            foreach (var productVariant in productVariants)
            {
                string GetProductVariant = $"select ProductLineId from ProductVariant where Id = {productVariant.Id}";
                int thisPLid = await dBController.GetCount(GetProductVariant);

                productVariant.Images = new List<ProductImage>();
                string GetImages = $"select * from ProductImage where ProductLineId = {thisPLid}";
                using (var dataTable = await dBController.GetData(GetImages))
                {
                    foreach (DataRow dataRow in dataTable.Rows)
                    {
                        var image = new ProductImage()
                        {
                            Id = (int)dataRow["Id"],
                            Name = (string)dataRow["Name"],
                            ProductLineId = (int)dataRow["ProductLineId"],
                            Image = (string)dataRow["Url"],
                        };
                        productVariant.Images.Add(image);
                    }
                }
                productVariant.Specifications = new List<Tuple<ProductSpecification, Specification, SpecificationType>>();
                string GetSpecifications = $"select * from ProductSpecification where ProductVariantId = {productVariant.Id}";
                using (var dataTable = await dBController.GetData(GetSpecifications))
                {
                    foreach (DataRow dataRow in dataTable.Rows)
                    {
                        var productSpecification = new ProductSpecification()
                        {
                            Id = (int)dataRow["Id"],
                            ProductVariantId = (int)dataRow["ProductVariantId"],
                            SpecificationId = (int)dataRow["SpecificationId"],
                        };
                        Specification specification;
                        string GetSpecification = $"select * from Specification where Id = {(int)dataRow["SpecificationId"]}";
                        using (var SpecData = await dBController.GetData(GetSpecification))
                        {
                            if (SpecData.Rows.Count is 0)
                            {
                                continue;
                            }
                            specification = new Specification()
                            {
                                Id = (int)SpecData.Rows[0]["Id"],
                                SpecificationTypeId = (int)SpecData.Rows[0]["SpecificationTypeId"],
                                Value = (string)SpecData.Rows[0]["Value"],
                            };
                        }
                        SpecificationType specificationType;
                        string GetSpecificationType = $"select * from SpecificationType where Id = {specification.SpecificationTypeId}";
                        using (var SpecData = await dBController.GetData(GetSpecificationType))
                        {
                            if (SpecData.Rows.Count is 0)
                            {
                                continue;
                            }
                            specificationType = new SpecificationType()
                            {
                                Id = (int)SpecData.Rows[0]["Id"],
                                Name = (string)SpecData.Rows[0]["Name"],
                            };
                        }
                        productVariant.Specifications.Add(new Tuple<ProductSpecification, Specification, SpecificationType>(productSpecification, specification, specificationType));
                    }
                }
            }
            return Ok(productVariants);
        }

        [HttpGet("Search/{keyword}")]
        public async Task<IActionResult> Search (string keyword)
        {
            HttpResponseMessage response = await _httpClient.GetAsync($"api/DTOController/GetLaptopProductTable");
            List<ProductVariantDTO> productVariants;
            if (!response.IsSuccessStatusCode)
            {
                return BadRequest();
            }
            string jsonResponse = await response.Content.ReadAsStringAsync();
            productVariants = JsonConvert.DeserializeObject<List<ProductVariantDTO>>(jsonResponse);

            // search functions
            // handling search

            return Ok();
        }

        [HttpGet("GetProductVariantDetail")]
        public async Task<IActionResult> GetProductVariantDetail(int ProductVariantId)
        {
            await PriceController.UpdatePriceStatus();
            ProductVariantDetailDTO product = new ProductVariantDetailDTO();
            product.Id = ProductVariantId;

            string GetName = $"select Name from ProductVariant where Id = {ProductVariantId}";
            using (var dataTable = await DBController.GetInstance().GetData(GetName))
            {
                if (dataTable.Rows.Count != 0)
                {
                    product.Name = (string)dataTable.Rows[0]["Name"];
                }
                else { return BadRequest(); }
            }

            string GetPriceCommand = @$"select * from Price where Status = 'ACTIVE' and ProductVariantId = {product.Id}";
            using (DataTable data = await DBController.GetInstance().GetData(GetPriceCommand))
            {
                if (data.Rows.Count is not 0)
                {
                    product.Price = (decimal)data.Rows[0]["Value"];
                }
                else { return BadRequest(); }
            }

            product.Images = new List<ProductImage>();
            string GetImages = $"select i.*\r\nfrom ProductImage i\r\njoin ProductLine pl on i.ProductLineId = pl.Id\r\njoin ProductVariant pv on pv.ProductLineId = pl.Id\r\nwhere pv.Id = {product.Id}";
            using (var dataTable = await DBController.GetInstance().GetData(GetImages))
            {
                foreach (DataRow dataRow in dataTable.Rows)
                {
                    var image = new ProductImage()
                    {
                        Id = (int)dataRow["Id"],
                        Name = (string)dataRow["Name"],
                        ProductLineId = (int)dataRow["ProductLineId"],
                        Image = (string)dataRow["Url"],
                    };
                    product.Images.Add(image);
                }
            }

            product.Specifications = new List<Tuple<ProductSpecification, Specification, SpecificationType>>();
            string GetSpecifications = $"select * from ProductSpecification where ProductVariantId = {product.Id}";
            using (var dataTable = await DBController.GetInstance().GetData(GetSpecifications))
            {
                foreach (DataRow dataRow in dataTable.Rows)
                {
                    var productSpecification = new ProductSpecification()
                    {
                        Id = (int)dataRow["Id"],
                        ProductVariantId = (int)dataRow["ProductVariantId"],
                        SpecificationId = (int)dataRow["SpecificationId"],
                    };
                    Specification specification;
                    string GetSpecification = $"select * from Specification where Id = {(int)dataRow["SpecificationId"]}";
                    using (var SpecData = await DBController.GetInstance().GetData(GetSpecification))
                    {
                        if (SpecData.Rows.Count is 0)
                        {
                            continue;
                        }
                        specification = new Specification()
                        {
                            Id = (int)SpecData.Rows[0]["Id"],
                            SpecificationTypeId = (int)SpecData.Rows[0]["SpecificationTypeId"],
                            Value = (string)SpecData.Rows[0]["Value"],
                        };
                    }
                    SpecificationType specificationType;
                    string GetSpecificationType = $"select * from SpecificationType where Id = {specification.SpecificationTypeId}";
                    using (var SpecData = await DBController.GetInstance().GetData(GetSpecificationType))
                    {
                        if (SpecData.Rows.Count is 0)
                        {
                            continue;
                        }
                        specificationType = new SpecificationType()
                        {
                            Id = (int)SpecData.Rows[0]["Id"],
                            Name = (string)SpecData.Rows[0]["Name"],
                        };
                    }
                    product.Specifications.Add(new Tuple<ProductSpecification, Specification, SpecificationType>(productSpecification, specification, specificationType));
                }
            }

            product.ProductVariants = new List<ProductVariant>();
            string GetVariants = $"select pv1.*\r\nfrom ProductVariant pv1 \r\njoin ProductLine pl on pv1.ProductLineId = pl.Id\r\njoin ProductVariant pv2 on pv2.ProductLineId = pl.Id\r\nwhere pv2.Id = {product.Id} and pv1.Id <> {product.Id}";
            using (var ProductData = await DBController.GetInstance().GetData(GetVariants))
            {
                foreach (DataRow dataRow in ProductData.Rows)
                {
                    var ProductVariant = new ProductVariant()
                    {
                        Id = (int)dataRow["Id"],
                        ProductLineId = (int)dataRow["ProductLineId"],
                        Name = (string)dataRow["Name"],
                    };
                    product.ProductVariants.Add(ProductVariant);
                }
            }

            product.Ratings = new List<RatingDTO>();
            string GetOrderItemsRating = $"SELECT r.*\r\nFROM Rating r\r\nJOIN OrderItem oi ON r.OrderItemId = oi.Id\r\nJOIN ProductInstance pi ON oi.ProductInstanceId = pi.Id\r\nJOIN ProductVariant pv ON pi.ProductVariantId = pv.Id\r\nWHERE pv.Id = {ProductVariantId}";
            using (var dataTable = await DBController.GetInstance().GetData(GetOrderItemsRating))
            {
                if (dataTable.Rows.Count == 0)
                {
                    product.AverageRating = 0;
                    product.RatingCount = 0;
                }
                else
                {
                    product.RatingCount = dataTable.Rows.Count;
                    decimal RatingSum = 0;
                    foreach (DataRow dataRow in dataTable.Rows)
                    {
                        var Rating = new Rating()
                        {
                            Id = (int)dataRow["Id"],
                            OrderItemId = (int)dataRow["OrderItemId"],
                            Date = (DateTime)dataRow["Date"],
                            Rate = (int)dataRow["Rate"],
                            Comment = (string)dataRow["Comment"],
                        };
                        RatingSum += Rating.Rate;

                        var productRate = new RatingDTO(Rating);
                        productRate.Name = string.Empty;
                        string GetCustomerName = $"select Name\r\nfrom Customer c\r\njoin Orders o on o.CustomerId = c.Id\r\njoin OrderItem oi on oi.OrderId = o.Id\r\njoin Rating r on r.OrderItemId = oi.Id\r\nwhere r.Id = {Rating.Id}";
                        using (var SpecData = await DBController.GetInstance().GetData(GetCustomerName))
                        {
                            if (SpecData.Rows.Count is 0)
                            {
                                continue;
                            }
                            productRate.Name = (string)SpecData.Rows[0]["Name"];
                        }
                        product.Ratings.Add(productRate);
                    }
                    product.AverageRating = RatingSum / product.RatingCount;
                }
            }
            return Ok(product);
        }

        [HttpGet("GetSpecificationList")]
        public async Task<IActionResult> GetSpecificationList()
        {
            HttpResponseMessage response = await _httpClient.GetAsync($"api/specificationtypes/GetSpecificationTypes");
            List<SpecificationType> SpecTypes;
            if (!response.IsSuccessStatusCode)
            {
                return BadRequest();
            }
            string jsonResponse = await response.Content.ReadAsStringAsync();
            SpecTypes = JsonConvert.DeserializeObject<List<SpecificationType>>(jsonResponse);

            List<SpecificationTypeDTO> Types = new List<SpecificationTypeDTO>();
            foreach (var type in SpecTypes)
            {
                SpecificationTypeDTO Type = new SpecificationTypeDTO(type);
                Type.Specifications = new List<Specification>();

                string GetSpecs = $"select * from Specification where SpecificationTypeId = {Type.Id}";
                using (DataTable dataTable = await DBController.GetInstance().GetData(GetSpecs))
                {
                    foreach (DataRow dataRow in dataTable.Rows)
                    {
                        var Specification = new Specification()
                        {
                            Id = (int)dataRow["Id"],
                            SpecificationTypeId = (int)dataRow["SpecificationTypeId"],
                            Value = (string)dataRow["Value"],
                        };
                        Type.Specifications.Add(Specification);
                    }
                }
                Types.Add(Type);
            }
            return Ok(Types);
        }
    }
}
