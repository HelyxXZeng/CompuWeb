using CompuWeb.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data;
using TestForASPWebAPI.Models;
using FuzzySharp;
using System.Linq;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using System.Collections;
using System.Security.Cryptography.X509Certificates;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestForASPWebAPI.Controllers
{
    [Route("api/DTOController")]
    [ApiController]
    public class DTOController : ControllerBase
    {
        private readonly ILogger<DTOController> _logger;
        private readonly HttpClient _httpClient;
        private List<ProductVariantDTO> productVariantsTable;
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

        [HttpGet("AuthenticateCustomer/{phoneNumber}")]
        public async Task<IActionResult> AuthenticateCustomer(string phoneNumber)
        {
            DBController dbController = DBController.GetInstance();
            string GetStaffAuthetication = $"select Id from Customer where PhoneNumber = '{phoneNumber}'";
            using (DataTable data = await dbController.GetData(GetStaffAuthetication))
            {
                if (data.Rows.Count is not 0) return Ok((int)data.Rows[0]["Id"]);
            }
            return Ok(false);
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

            if (order.StaffId == 0 || order.CustomerId == 0) { return BadRequest("Invalid Data!"); }

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
                if (data.Rows.Count is 0) thisOrderPromotion = new Promotion()
                {
                    Id = 0,
                    ProductVariantIdPromotion = 0,
                    ProductVariantIdPurchase = 0,
                };
                else thisOrderPromotion = new Promotion()
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
                            string InsertOrderItem = $"insert into OrderItem (ProductInstanceId, OrderId, PriceId, PromotionId) values ({(int)data.Rows[i]["Id"]}, {thisOrderId}, {thisPrice.Id}, {thisOrderPromotion.Id})";
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
                            string InsertOrderItem = $"insert into OrderItem (ProductInstanceId, OrderId, PriceId) values ({(int)data.Rows[i]["Id"]}, {thisOrderId}, {thisPrice.Id})";
                            dbController.UpdateData(InsertOrderItem);

                            string UpdateInstance = $"update ProductInstance set Available = 0 where Id = {(int)data.Rows[i]["Id"]}";
                            dbController.UpdateData(UpdateInstance);
                        }
                    }
                }
            }
            string UpdateTotalforOrder = $"update Orders set Total = {total.ToString("0.00")} where Id = {thisOrderId}";
            dbController.UpdateData(UpdateTotalforOrder);
            return Ok(thisOrderId);
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
        public async Task<IActionResult> CreateProductVariant(int Price, ProductVariantForCreator variants)
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

        [HttpGet("GetLaptopProductPage")]
        public async Task<IActionResult> GetLaptopProductPage()
        {
            if (productVariantsTable is not null) return Ok(productVariantsTable);

            List<ProductVariantDTO> productVariants = new List<ProductVariantDTO>();

            string GetProducts = $"select Id from ProductVariant";
            using (DataTable data = await DBController.GetInstance().GetData(GetProducts))
            {
                foreach (DataRow row in data.Rows)
                {
                    HttpResponseMessage response = await _httpClient.GetAsync($"api/DTOController/GetLaptopProductById/{(int)row["Id"]}");
                    if (!response.IsSuccessStatusCode)
                    {
                        return BadRequest();
                    }

                    string jsonResponse = await response.Content.ReadAsStringAsync();
                    productVariants.Add(JsonConvert.DeserializeObject<ProductVariantDTO>(jsonResponse));
                }
            }
            productVariantsTable = productVariants;
            return Ok(productVariants);
        }

        [HttpGet("GetLaptopProductById/{id}")]
        public async Task<IActionResult> GetLaptopProductById(int id)
        {
            ProductVariant pv;
            string command = @$"select * from ProductVariant where Id = {id}";
            using (DataTable dataTable = await DBController.GetInstance().GetData(command))
            {
                if (dataTable.Rows.Count == 0) return BadRequest();
                pv = new ProductVariant()
                {
                    Id = (int)dataTable.Rows[0]["Id"],
                    Name = (string)dataTable.Rows[0]["Name"],
                    ProductLineId = (int)dataTable.Rows[0]["ProductLineId"],
                };
            }
            string Name = string.Empty;
            string getCategoryIdCommand = $@"select CategoryId from ProductLine where Id = {pv.ProductLineId}";
            using (DataTable data = await DBController.GetInstance().GetData(getCategoryIdCommand))
            {
                if (data.Rows.Count is 0)
                {
                    return Ok();
                }

                string getCategoryNameCommand = $"select Name from Category where Id = {data.Rows[0]["CategoryId"]}";
                using (DataTable name = await DBController.GetInstance().GetData(getCategoryNameCommand))
                {
                    Name = (string)name.Rows[0]["Name"];
                }
            }

            int InstancesCount = 0;
            string getInstanceCount = $@"select count(*) from ProductInstance where ProductVariantId = {pv.Id} and Available = 1";
            InstancesCount = await DBController.GetInstance().GetCount(getInstanceCount);

            await PriceController.UpdatePriceStatus();
            decimal Value = 0;
            string GetPriceCommand = @$"select * from Price where Status = 'ACTIVE' and ProductVariantId = {pv.Id}";
            using (DataTable data = await DBController.GetInstance().GetData(GetPriceCommand))
            {
                if (data.Rows.Count is not 0)
                {
                    Value = (decimal)data.Rows[0]["Value"];
                }
            }

            var productVariant = new ProductVariantDTO()
            {
                Id = pv.Id,
                Name = pv.Name,
                CategoryName = Name,
                NumberInStock = InstancesCount,
                Price = Value,
            };
            string GetProductVariant = $"select ProductLineId from ProductVariant where Id = {productVariant.Id}";
            int thisPLid = await DBController.GetInstance().GetCount(GetProductVariant);

            productVariant.Images = new List<ProductImage>();
            string GetImages = $"select * from ProductImage where ProductLineId = {thisPLid}";
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
                    productVariant.Images.Add(image);
                    break;
                }
            }
            productVariant.Specifications = new List<Tuple<ProductSpecification, Specification, SpecificationType>>();
            string GetSpecifications = $"select * from ProductSpecification where ProductVariantId = {productVariant.Id}";
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
                    productVariant.Specifications.Add(new Tuple<ProductSpecification, Specification, SpecificationType>(productSpecification, specification, specificationType));
                }
            }
            return Ok(productVariant);
        }

        [HttpGet("GetLaptopProductTable/{start}-{count}")]
        public async Task<IActionResult> GetLaptopProductTable(int start, int count)
        {
            HttpResponseMessage response = await _httpClient.GetAsync($"api/DTOController/GetLaptopProductPage");
            List<ProductVariantDTO> productVariants;
            if (!response.IsSuccessStatusCode)
            {
                return BadRequest();
            }
            string jsonResponse = await response.Content.ReadAsStringAsync();
            productVariants = JsonConvert.DeserializeObject<List<ProductVariantDTO>>(jsonResponse);

            List<ProductVariantDTO> Results = productVariants.Skip(start - 1).Take(count).ToList();

            Tuple<List<ProductVariantDTO>, int> products = new Tuple<List<ProductVariantDTO>, int>(Results, productVariants.Count());

            return Ok(products);
        }

        [HttpGet("Search/{keyword}/{start}-{count}")]
        public async Task<IActionResult> Search(int start, int count, string keyword = "")
        {
            HttpResponseMessage response = await _httpClient.GetAsync($"api/DTOController/GetLaptopProductPage");
            List<ProductVariantDTO> productVariants;
            if (!response.IsSuccessStatusCode)
            {
                return BadRequest();
            }
            string jsonResponse = await response.Content.ReadAsStringAsync();
            productVariants = JsonConvert.DeserializeObject<List<ProductVariantDTO>>(jsonResponse);

            List<Tuple<ProductVariantDTO, int>> SearchResults = productVariants
                .Select(result => new Tuple<ProductVariantDTO, int>(result, keyword == "" ? 100 : Fuzz.PartialRatio(result.Name.ToLower(), keyword.ToLower())))
                .Where(result => result.Item2 >= 40) // Adjust accuracy threshold here
                .OrderByDescending(result => result.Item2)
                .Skip(start - 1).Take(count)
                .ToList();

            int countResults = productVariants
                .Select(result => new Tuple<ProductVariantDTO, int>(result, Fuzz.PartialRatio(result.Name.ToLower(), keyword.ToLower())))
                .Where(result => result.Item2 >= 40) // Adjust accuracy threshold here
                .ToList().Count();

            Tuple<List<Tuple<ProductVariantDTO, int>>, int> result = new Tuple<List<Tuple<ProductVariantDTO, int>>, int>(SearchResults, countResults);

            return Ok(result);
        }

        [HttpPost("SearchWithFilter/{keyword}/{start}-{count}")]
        public async Task<IActionResult> SearchWithFilter([FromBody] List<Tuple<int, string>> filterOps, int start, int count, string keyword = "", int brandId = 0, int categoryId = 0, int lowestPrice = 0, int highestPrice = 200000000)
        {
            List<ProductVariantDTO> productVariants = new List<ProductVariantDTO>();

            string baseQuery = @"
                SELECT pv.Id
                FROM ProductVariant pv
                INNER JOIN ProductSpecification ps ON pv.Id = ps.ProductVariantId
                INNER JOIN Specification s ON ps.SpecificationId = s.Id
                INNER JOIN ProductLine pl ON pl.Id = pv.ProductLineId
                INNER JOIN Brand b ON b.Id = pl.BrandId
                WHERE ";

            // List to store individual conditions
            List<string> conditions = new List<string>();

            // Generate SQL conditions for each element in the list
            foreach (var filter in filterOps)
            {
                conditions.Add($"(s.SpecificationTypeId = {filter.Item1} AND s.Value like '%{filter.Item2}%')");
            }

            // Combine conditions using OR
            string combinedConditions = "(" + string.Join("\n\tOR\n\t", conditions) + ")";
            string brandCondition = (brandId == 0) ? "" : $"b.Id = {brandId}";
            string categoryCondition = (categoryId == 0) ? "" : $"pl.CategoryId = {categoryId}";

            List<string> Cons = new List<string>() { combinedConditions, brandCondition, categoryCondition };
            List<string> newCons = new List<string>();
            foreach (var condition in Cons)
            {
                if (condition != "" && condition != "()") newCons.Add(condition);
            }

            string finalConditions = string.Join("\n\tAND ", newCons);

            // Complete SQL query
            string finalQuery = $"{baseQuery}{finalConditions}\nGROUP BY pv.Id\nHAVING COUNT(DISTINCT s.SpecificationTypeId) = {filterOps.Count};";

            if (filterOps.Count == 0 && brandId == 0 && categoryId == 0) { finalQuery = @"select Id from ProductVariant"; }
            else if (filterOps.Count == 0) finalQuery = $"{baseQuery}{finalConditions}\nGROUP BY pv.Id";

            using (DataTable data = await DBController.GetInstance().GetData(finalQuery))
            {
                foreach (DataRow row in data.Rows)
                {
                    HttpResponseMessage response = await _httpClient.GetAsync($"api/DTOController/GetLaptopProductById/{(int)row["Id"]}");
                    if (!response.IsSuccessStatusCode)
                    {
                        return BadRequest();
                    }

                    string jsonResponse = await response.Content.ReadAsStringAsync();
                    productVariants.Add(JsonConvert.DeserializeObject<ProductVariantDTO>(jsonResponse));
                }
            }

            List<Tuple<ProductVariantDTO, int>> SearchResults = productVariants
                .Select(result => new Tuple<ProductVariantDTO, int>(result, keyword == "" ? 100 : Fuzz.PartialRatio(result.Name.ToLower(), keyword.ToLower())))
                .Where(result => result.Item2 >= 40 && result.Item1.Price >= lowestPrice && result.Item1.Price <= highestPrice) // Adjust accuracy threshold here
                .OrderByDescending(result => result.Item2)
                .Skip(start - 1).Take(count)
                .ToList();

            int countResults = productVariants
                .Select(result => new Tuple<ProductVariantDTO, int>(result, keyword == "" ? 100 : Fuzz.PartialRatio(result.Name.ToLower(), keyword.ToLower())))
                .Where(result => result.Item2 >= 40 && result.Item1.Price >= lowestPrice && result.Item1.Price <= highestPrice) // Adjust accuracy threshold here
                .ToList().Count();

            Tuple<List<Tuple<ProductVariantDTO, int>>, int> result = new Tuple<List<Tuple<ProductVariantDTO, int>>, int>(SearchResults, countResults);

            return Ok(result);
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

            string GetPriceCommand = @$"select Value from Price where Status = 'ACTIVE' and ProductVariantId = {product.Id}";
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
                    
                    string GetPrice = @$"select * from Price where Status = 'ACTIVE' and ProductVariantId = {ProductVariant.Id}";
                    using (DataTable data = await DBController.GetInstance().GetData(GetPrice))
                    {
                        if (data.Rows.Count is not 0)
                        {
                            ProductVariant.Price = new Price();
                            ProductVariant.Price.Value = (decimal)data.Rows[0]["Value"];
                        }
                        else { return BadRequest(); }
                    }
                    product.ProductVariants.Add(ProductVariant);
                }
            }

            product.Ratings = new List<RatingDTO>();
            string GetOrderItemsRating = $"SELECT r.*\r\nFROM Rating r\r\nJOIN OrderItem oi ON r.OrderItemId = oi.Id\r\nJOIN ProductInstance pi ON oi.ProductInstanceId = pi.Id\r\nJOIN ProductVariant pv ON pi.ProductVariantId = pv.Id\r\nWHERE pv.Id = {ProductVariantId} and r.Status = 'APPROVED'";
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
                            Rate = (int)dataRow["Rating"],
                            Comment = (string)dataRow["Comment"],
                            Status = (string)dataRow["Status"]
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

        [HttpGet("GetProductVariantInCart")]
        public async Task<IActionResult> GetProductVariantInCart(int PVid)
        {
            var product = new ProductVariantDTO();
            string GetProductVariant = $"select pv.Id, pv.Name, p.Value as Price\r\nfrom ProductVariant pv\r\njoin Price p on p.ProductVariantId = pv.Id\r\nwhere pv.Id = {PVid}";
            using (DataTable data = await DBController.GetInstance().GetData(GetProductVariant))
            {
                if (data.Rows.Count is 0) return BadRequest("Not Exist!");
                else
                {
                    product.Id = (int)data.Rows[0]["Id"];
                    product.Name = (string)data.Rows[0]["Name"];
                    product.Price = (decimal)data.Rows[0]["Price"];
                }
            }
            string GetImage = $"select pi.Id, pi.Name, pi.Url as Image\r\nfrom ProductImage pi\r\njoin ProductLine pl on pi.ProductLineId = pl.Id\r\njoin ProductVariant pv on pv.ProductLineId = pl.Id\r\nwhere pv.Id = {PVid}";
            using (DataTable data = await DBController.GetInstance().GetData(GetImage))
            {
                if (data.Rows.Count is 0) return BadRequest("Not Exist!");
                else
                {
                    product.Images = new List<ProductImage>();
                    var image = new ProductImage()
                    {
                        Id = (int)data.Rows[0]["Id"],
                        Name = (string)data.Rows[0]["Name"],
                        Image = (string)data.Rows[0]["Image"],
                    };
                    product.Images.Add(image);
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

        [HttpGet("GetOrderTable")]
        public async Task<IActionResult> GetOrderTable()
        {
            List<OrderDetailDTO> Orders = new List<OrderDetailDTO>();
            string GetOrder = $"select Id, CustomerId, Total, Status, Address from Orders";
            using (DataTable dataTable = await DBController.GetInstance().GetData(GetOrder))
            {
                foreach (DataRow dataRow in dataTable.Rows)
                {
                    string GetCustomerInfo = $"select Name, PhoneNumber from Customer where Id = {(int)dataRow["CustomerId"]}";
                    using (DataTable data = await DBController.GetInstance().GetData(GetCustomerInfo))
                    {
                        var order = new OrderDetailDTO()
                        {
                            Id = (int)dataRow["Id"],
                            Total = (decimal)dataRow["Total"],
                            Status = (string)dataRow["Status"],
                            Address = (string)dataRow["Address"],
                            CustomerName = (string)data.Rows[0]["Name"],
                            CustomerPhoneNumber = (string)data.Rows[0]["PhoneNumber"],
                        };
                        Orders.Add(order);
                    }
                }
            }
            return Ok(Orders);
        }

        [HttpGet("GetOrderDetail")]
        public async Task<IActionResult> GetOrderDetail(int OrderId)
        {
            OrderDetailDTO Order;
            string GetOrderDetail = $"select * from Orders where Id = {OrderId}";
            using (DataTable dataTable = await DBController.GetInstance().GetData(GetOrderDetail))
            {
                if (dataTable.Rows.Count == 0) { return BadRequest("Not Exists!"); }
                Order = new OrderDetailDTO()
                {
                    Id = OrderId,
                    Total = (decimal)dataTable.Rows[0]["Total"],
                    Note = (string)dataTable.Rows[0]["Note"],
                    Date = (DateTime)dataTable.Rows[0]["Date"],
                    Address = (string)dataTable.Rows[0]["Address"],
                    Status = (string)dataTable.Rows[0]["Status"],
                };
                string GetCustomerInfo = $"select Name, PhoneNumber from Customer where Id = {dataTable.Rows[0]["CustomerId"]}";
                using (DataTable data = await DBController.GetInstance().GetData(GetCustomerInfo))
                {
                    Order.CustomerPhoneNumber = (string)data.Rows[0]["PhoneNumber"];
                    Order.CustomerName = (string)data.Rows[0]["Name"];
                }
                Order.orderItems = new List<OrderItemDTO>();
                string GetOrderItems = $"select Id, ProductInstanceId as InstanceId, PriceId, OrderId from OrderItem where OrderId = {OrderId}";
                using (DataTable data = await DBController.GetInstance().GetData(GetOrderItems))
                {
                    foreach (DataRow row in data.Rows)
                    {
                        var orderitem = new OrderItemDTO()
                        {
                            Id = (int)row["Id"],
                        };
                        int PVid;
                        string GetPVName = $"select pv.Id, pi.Id as ProductInstanceId, Name\r\nfrom ProductVariant pv\r\njoin ProductInstance pi on pi.ProductVariantId = pv.Id\r\njoin OrderItem oi on oi.ProductInstanceId = pi.Id\r\nwhere oi.Id = {(int)row["Id"]}";
                        using (DataTable d = await DBController.GetInstance().GetData(GetPVName))
                        {
                            orderitem.ProductVariantName = (string)d.Rows[0]["Name"];
                            PVid = (int)d.Rows[0]["Id"];
                        }
                        string GetSerialNumber = $"select SerialNumber from ProductInstance where Id = {(int)row["InstanceId"]}";
                        using (DataTable d = await DBController.GetInstance().GetData(GetSerialNumber))
                        {
                            orderitem.SerialNumber = (string)d.Rows[0]["SerialNumber"];
                        }
                        string GetPrice = $"select p.ProductVariantId, p.Value\r\nfrom Price p\r\njoin ProductVariant pv on pv.Id = p.ProductVariantId\r\njoin ProductInstance pi on pi.ProductVariantId = pv.Id\r\njoin OrderItem oi on oi.ProductInstanceId = pi.Id\r\nwhere oi.Id = {(int)row["Id"]}";
                        using (DataTable d = await DBController.GetInstance().GetData(GetPrice))
                        {
                            orderitem.Price = (decimal)d.Rows[0]["Value"];
                        }
                        Order.orderItems.Add(orderitem);
                    }
                }
            }
            return Ok(Order);
        }

        [HttpGet("GetCustomerOrderDetail")]
        public async Task<IActionResult> GetCustomerOrderDetail(int OrderId)
        {
            OrderDetailDTO Order;
            string GetOrderDetail = $"select * from Orders where Id = {OrderId}";
            using (DataTable dataTable = await DBController.GetInstance().GetData(GetOrderDetail))
            {
                if (dataTable.Rows.Count == 0) { return BadRequest("Not Exists!"); }
                Order = new OrderDetailDTO()
                {
                    Id = OrderId,
                    Total = (decimal)dataTable.Rows[0]["Total"],
                    Note = (string)dataTable.Rows[0]["Note"],
                    Date = (DateTime)dataTable.Rows[0]["Date"],
                    Address = (string)dataTable.Rows[0]["Address"],
                    Status = (string)dataTable.Rows[0]["Status"],
                };
                string GetCustomerInfo = $"select Name, PhoneNumber from Customer where Id = {dataTable.Rows[0]["CustomerId"]}";
                using (DataTable data = await DBController.GetInstance().GetData(GetCustomerInfo))
                {
                    Order.CustomerPhoneNumber = (string)data.Rows[0]["PhoneNumber"];
                    Order.CustomerName = (string)data.Rows[0]["Name"];
                }
                Order.VariantByOrderItems = new List<OrderVariantByOrderItem>();
                string GetVariants = $"select distinct pv.*\r\nfrom ProductVariant pv\r\njoin ProductInstance pi on pi.ProductVariantId = pv.Id\r\njoin ProductLine pl on pl.Id = pv.ProductLineId\r\njoin OrderItem oi on oi.ProductInstanceId = pi.Id\r\njoin Orders o on oi.OrderId = o.Id\r\nwhere o.Id = {OrderId}";
                using (DataTable data = await DBController.GetInstance().GetData(GetVariants))
                {
                    foreach (DataRow row in data.Rows)
                    {
                        var variant = new OrderVariantByOrderItem()
                        {
                            VariantId = (int)row["Id"],
                            Name = (string)row["Name"],
                            OrderItemIds = new List<int>(),
                        };
                        string GetItemIds = $"select oi.Id from OrderItem oi\r\njoin ProductInstance pi on pi.Id = oi.ProductInstanceId\r\njoin ProductVariant pv on pv.Id = pi.ProductVariantId\r\nwhere pv.Id = {variant.VariantId}";
                        using (DataTable d = await DBController.GetInstance().GetData(GetItemIds))
                        {
                            foreach (DataRow row1 in d.Rows)
                            {
                                variant.OrderItemIds.Add((int)row1["Id"]);
                            }
                        }
                        variant.Quantity = variant.OrderItemIds.Count();
                        string GetImage = $"select top 1 Url\r\nfrom ProductImage pi\r\njoin ProductLine pl on pi.ProductLineId = pl.Id\r\njoin ProductVariant pv on pl.Id = pv.ProductLineId\r\nwhere pv.Id = {variant.VariantId}";
                        using (DataTable d = await DBController.GetInstance().GetData(GetImage))
                        {
                            if (d.Rows.Count == 0) return BadRequest();
                            variant.Image = (string)d.Rows[0]["Url"];
                        }
                        string GetPrice = $"select Value\r\nfrom Price\r\nwhere ProductVariantId = {variant.VariantId}";
                        using (DataTable d = await DBController.GetInstance().GetData(GetPrice))
                        {
                            if (d.Rows.Count == 0) return BadRequest();
                            variant.Price = ((decimal)d.Rows[0]["Value"]) * variant.Quantity;
                        }
                        Order.VariantByOrderItems.Add(variant);
                    }
                }
            }
            return Ok(Order);
        }

        [HttpGet("GetOrdersByPhoneNumber")]
        public async Task<IActionResult> GetOrdersByPhoneNumber(string phoneNumber)
        {
            List<CustomerOrders> orders = new List<CustomerOrders>();
            string GetOrders = $"SELECT\r\n    o.Id AS 'Id',\r\n    c.Name AS 'Name',\r\n    o.Date AS 'Date',\r\n    o.Status AS 'Status',\r\n    o.Total AS 'Total',\r\n    COUNT(oi.Id) as 'ItemCount',\r\n    PV.Name AS 'VariantName',\r\n    PI.Url AS 'Image'\r\nFROM Orders o\r\nJOIN Customer c ON o.CustomerId = c.Id\r\nLEFT JOIN OrderItem oi ON oi.OrderId = o.Id\r\nLEFT JOIN \r\n    (\r\n        SELECT \r\n            oi.OrderId,\r\n            MIN(pv.Name) AS Name\r\n        FROM \r\n            OrderItem oi\r\n        JOIN \r\n            ProductInstance pi ON oi.ProductInstanceId = pi.Id\r\n        JOIN \r\n            ProductVariant pv ON pi.ProductVariantId = pv.Id\r\n        GROUP BY \r\n            oi.OrderId\r\n    ) PV ON o.Id = PV.OrderId\r\nLEFT JOIN \r\n    (\r\n        SELECT \r\n            oi.OrderId,\r\n            MIN(pim.Url) AS Url\r\n        FROM \r\n            OrderItem oi\r\n        JOIN \r\n            ProductInstance pi ON oi.ProductInstanceId = pi.Id\r\n        JOIN \r\n            ProductVariant pv ON pi.ProductVariantId = pv.Id\r\n        JOIN \r\n            ProductImage pim ON pv.Id = pim.ProductLineId\r\n        GROUP BY \r\n            oi.OrderId\r\n    ) PI ON o.Id = PI.OrderId\r\nWHERE \r\n    c.PhoneNumber = '+841234567890'\r\nGROUP BY \r\n    o.Id, c.Name, o.Date, o.Status, o.Total, PV.Name, PI.Url;";
            using (DataTable data = await DBController.GetInstance().GetData(GetOrders))
            {
                foreach (DataRow row in data.Rows)
                {
                    var order = new CustomerOrders()
                    {
                        Id = (int)row["Id"],
                        Name = (string)row["Name"],
                        Date = (DateTime)row["Date"],
                        Status = (string)row["Status"],
                        Total = (decimal)row["Total"],
                        ItemCount = (int)row["ItemCount"],
                        VariantName = Convert.ToString(row["VariantName"]),
                        Image = Convert.ToString(row["Image"]),
                    };
                    orders.Add(order);
                }
            }
            return Ok(orders);
        }

        [HttpGet("GetCurrentPrice/{PVId}")]
        public async Task<IActionResult> GetCurrentPrice(int PVId)
        {
            string GetCurrentPrice = $"select * from Price where ProductVariantId = {PVId} and Status = 'ACTIVE'";
            using (DataTable data = await DBController.GetInstance().GetData(GetCurrentPrice))
            {
                var Price = new Price()
                {
                    Id = (int)data.Rows[0]["Id"],
                    ProductVariantId = (int)data.Rows[0]["ProductVariantId"],
                    StartDate = (DateTime)data.Rows[0]["StartDate"],
                    EndDate = (DateTime)data.Rows[0]["EndDate"],
                    Status = (string)data.Rows[0]["Status"],
                    Value = (decimal)data.Rows[0]["Value"],
                };
                return Ok(Price);
            }
        }

        [HttpPut("UpdateProductImage")]
        public async Task<IActionResult> UpdateProductImage(List<ProductImage> ProductImages)
        {
            string GetImageId = $"select Id from ProductImage where ProductLineId = {ProductImages[0].ProductLineId}";
            List<int> Ids = new List<int>();
            using (DataTable data = await DBController.GetInstance().GetData(GetImageId))
            {
                foreach (DataRow dataRow in data.Rows)
                {
                    Ids.Add((int)dataRow["Id"]);
                }
            }
            int minLength = Math.Min(ProductImages.Count(), Ids.Count());

            for (int i = 0; i < minLength; i++)
            {
                string UpdateProductImage = $"UPDATE ProductImage SET ProductLineId = {ProductImages[i].ProductLineId}, Name = N'{ProductImages[i].ProductLineId}', Url = '{ProductImages[i].Image}' WHERE Id = {Ids[i]}";
                DBController dbController = DBController.GetInstance();
                dbController.UpdateData(UpdateProductImage);
            }

            for (int i = minLength; i < ProductImages.Count(); i++)
            {
                string InsertImage = $"INSERT INTO ProductImage (ProductLineId, Name, Url) VALUES ({ProductImages[i].ProductLineId}, N'{ProductImages[i].Name}', '{ProductImages[i].Image}')";
                DBController dbController = DBController.GetInstance();
                dbController.UpdateData(InsertImage);
            }

            for (int i = minLength; i < Ids.Count(); i++)
            {
                string command = $"DELETE FROM ProductImage WHERE Id = {Ids[i]}";
                DBController dbController = DBController.GetInstance();
                dbController.DeleteData(command);
            }
            return Ok();
        }

        [HttpPut("UpdateProductSpecification")]
        public async Task<IActionResult> UpdateProductSpecification(List<ProductSpecification> ProductSpecifications)
        {
            string GetImageId = $"select Id from ProductSpecification where ProductVariantId = {ProductSpecifications[0].ProductVariantId}";
            List<int> Ids = new List<int>();
            using (DataTable data = await DBController.GetInstance().GetData(GetImageId))
            {
                foreach (DataRow dataRow in data.Rows)
                {
                    Ids.Add((int)dataRow["Id"]);
                }
            }
            int minLength = Math.Min(ProductSpecifications.Count(), Ids.Count());

            for (int i = 0; i < minLength; i++)
            {
                string UpdateProductImage = $"UPDATE ProductSpecification SET ProductVariantId = {ProductSpecifications[i].ProductVariantId}, SpecificationId = {ProductSpecifications[i].SpecificationId} WHERE Id = {Ids[i]}";
                DBController dbController = DBController.GetInstance();
                dbController.UpdateData(UpdateProductImage);
            }

            for (int i = minLength; i < ProductSpecifications.Count(); i++)
            {
                string InsertImage = $"INSERT INTO ProductSpecification (ProductVariantId, SpecificationId) VALUES ({ProductSpecifications[i].ProductVariantId}, {ProductSpecifications[i].SpecificationId})";
                DBController dbController = DBController.GetInstance();
                dbController.UpdateData(InsertImage);
            }

            for (int i = minLength; i < Ids.Count(); i++)
            {
                string command = $"DELETE FROM ProductSpecification WHERE Id = {Ids[i]}";
                DBController dbController = DBController.GetInstance();
                dbController.DeleteData(command);
            }
            return Ok();
        }

        [HttpGet("GetRatingList")]
        public async Task<IActionResult> GetRatingList (int PVid)
        {
            List<RatingDTO> ratings = new List<RatingDTO>();
            string GetRating = $"select o.Id, r.Rating, r.Date, r.Comment, c.Name\r\nfrom Rating r\r\njoin OrderItem oi on r.OrderItemId = oi.Id\r\njoin Orders o on oi.OrderId = o.Id\r\njoin Customer c on o.CustomerId = c.Id\r\njoin ProductInstance pi on oi.ProductInstanceId = pi.Id\r\njoin ProductVariant pv on pi.ProductVariantId = pv.Id\r\nwhere pv.Id = {PVid}";
            using (DataTable data = await DBController.GetInstance().GetData(GetRating))
            {
                foreach (DataRow row in data.Rows)
                {
                    var rating = new RatingDTO()
                    {
                        Id = (int)row["Id"],
                        Name = (string)row["Name"],
                        Date = (DateTime)row["Date"],
                        Comment = (string)row["Comment"],
                        Rate = (int)row["Rating"],
                    };
                    ratings.Add(rating);
                }
            }
            return Ok(ratings);
        }

        [HttpGet("GetRatingTable")]
        public async Task<IActionResult> GetRatingTable()
        {
            var ratings = new List<RatingDTO>();
            string GetRating = $"select r.*, pv.Name as ProductVariantName\r\nfrom Rating r\r\njoin OrderItem oi on r.OrderItemId = oi.Id\r\njoin ProductInstance pi on oi.ProductInstanceId = pi.Id\r\njoin ProductVariant pv on pi.ProductVariantId = pv.Id";
            using (DataTable data = await DBController.GetInstance().GetData(GetRating))
            {
                foreach (DataRow row in data.Rows)
                {
                    var rating = new RatingDTO()
                    {
                        Id = (int)row["Id"],
                        Name = (string)row["ProductVariantName"],
                        Comment = (string)row["Comment"],
                        Rate = (int)row["Rating"],
                        Date = (DateTime)row["Date"],
                        Status = (string)row["Status"],
                    };
                    ratings.Add(rating);
                }
            }
            return Ok(ratings);
        }

        [HttpGet("GetReturnTable")]
        public async Task<IActionResult> GetReturnTable()
        {
            var items = new List<ReturnItemTable>();
            string GetReturnItems = $"select roi.*, pv.Name as ProductVariantName, c.Name as CustomerName\r\nfrom ReturnOrderItem roi\r\njoin OrderItem oi on roi.OrderItemId = oi.Id\r\njoin ProductInstance pi on oi.ProductInstanceId = pi.Id\r\njoin ProductVariant pv on pi.ProductVariantId = pv.Id\r\njoin Orders o on oi.OrderId = o.Id\r\njoin Customer c on o.CustomerId = c.Id";
            using (DataTable data = await DBController.GetInstance().GetData(GetReturnItems))
            {
                foreach (DataRow row in data.Rows)
                {
                    var item = new ReturnItemTable()
                    {
                        Id = (int)row["Id"],
                        Name = (string)row["ProductVariantName"],
                        CustomerName = (string)row["CustomerName"],
                        Price = (decimal)row["Price"],
                        Date = (DateTime)row["Date"],
                        Issues = (string)row["Issues"],
                        Status = (string)row["Status"],
                    };
                    items.Add(item);
                }
            }
            return Ok(items);
        }

        [HttpGet("GetProductInstances")]
        public async Task<IActionResult> GetProductInstances()
        {
            var items = new List<ProductInstanceDTO>();
            string GetReturnItems = $"select pi.*, pv.Name as ProductVariantName\r\nfrom ProductInstance pi\r\njoin ProductVariant pv on pi.ProductVariantId = pv.Id";
            using (DataTable data = await DBController.GetInstance().GetData(GetReturnItems))
            {
                foreach (DataRow row in data.Rows)
                {
                    var item = new ProductInstanceDTO()
                    {
                        Id = (int)row["Id"],
                        ProductVariantName = (string)row["ProductVariantName"],
                        SerialNumber = (string)row["SerialNumber"],
                        Available = (bool)row["Available"],
                        Status = (string)row["Status"],
                    };
                    items.Add(item);
                }
            }
            return Ok(items);
        }

        [HttpGet("GetSpecifications")]
        public async Task<IActionResult> GetSpecifications()
        {
            var items = new List<SpecificationDTO>();
            string GetReturnItems = $"select * from Specification s\r\njoin SpecificationType st on s.SpecificationTypeId = st.Id";
            using (DataTable data = await DBController.GetInstance().GetData(GetReturnItems))
            {
                foreach (DataRow row in data.Rows)
                {
                    var item = new SpecificationDTO()
                    {
                        Id = (int)row["Id"],
                        SpecificationTypeName = (string)row["Name"],
                        Value = (string)row["Value"],
                    };
                    items.Add(item);
                }
            }
            return Ok(items);
        }

        [HttpGet("GetPrices")]
        public async Task<IActionResult> GetPrices()
        {
            var items = new List<PriceDTO>();
            string GetReturnItems = $"select * from Price p\r\njoin ProductVariant pv on p.ProductVariantId = pv.Id";
            using (DataTable data = await DBController.GetInstance().GetData(GetReturnItems))
            {
                foreach (DataRow row in data.Rows)
                {
                    var item = new PriceDTO()
                    {
                        Id = (int)row["Id"],
                        ProductVariantName = (string)row["Name"],
                        StartDate = (DateTime)row["StartDate"],
                        EndDate = (DateTime)row["EndDate"],
                        Status = (string)row["Status"],
                        Value = (decimal)row["Value"],
                    };
                    items.Add(item);
                }
            }
            return Ok(items);
        }
    }
}
