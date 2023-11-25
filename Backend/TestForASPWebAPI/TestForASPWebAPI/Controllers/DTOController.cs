using CompuWeb.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Validations;
using System.Data;
using System.Globalization;
using System.Xml.Linq;
using TestForASPWebAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestForASPWebAPI.Controllers
{
    [Route("api/DTOController")]
    [ApiController]
    public class DTOController : ControllerBase
    {
        private readonly ILogger<DTOController> _logger;
        public DTOController(ILogger<DTOController> logger)
        {
            _logger = logger;
        }
        // GET: api/<ValuesController>
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


        // GET api/<ValuesController>/5
        [HttpPut("CreateOrder")]
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

        [HttpPut("CreateProductVariant")]
        public async Task<IActionResult> CreateProductVariant(ProductVariant variants, int Price)
        {
            DBController dbController = DBController.GetInstance();

            string createVariantCommand = $"INSERT INTO ProductVariant (ProductLineId, Name) VALUES ({variants.ProductLineId}, N'{variants.Name}')";
            dbController.UpdateData(createVariantCommand);

            foreach (var specification in variants.Specifications)
            {
                string command = $"INSERT INTO ProductSpecification (ProductVariantId, SpecificationId) VALUES ({specification.ProductVariantId}, {specification.SpecificationId})";
                dbController.UpdateData(command);
            }

            string CreatePriceCommand = $"INSERT INTO Price (ProductVariantId, StartDate, EndDate, Status, Value) VALUES ({variants.Id}, '{DateTime.Now.ToString("yyyy-MM-dd")}', '2030-12-31', 'ACTIVE', '{Price.ToString("0.00")}')";
            dbController.UpdateData(CreatePriceCommand);
            return Ok();
        }
        [HttpPut("CreateProductLine")]
        public async Task<IActionResult> CreateProductLine(ProductLine productLine)
        {
            DBController dbController = DBController.GetInstance();

            string CreateProductLine = $"INSERT INTO ProductLine (CategoryId, BrandId, Name, ReleaseDate, Warranty, Description) VALUES ({productLine.CategoryId}, {productLine.BrandId}, N'{productLine.Name}', '{productLine.ReleaseDate.ToString("yyyy-MM-dd")}', {productLine.Warranty}, N'{productLine.Description}')";
            dbController.UpdateData(CreateProductLine);

            foreach (var image in productLine.Images)
            {
                string command = $"INSERT INTO ProductImage (ProductLineId, Name, Url) VALUES ({image.ProductLineId}, N'{image.Name}', '{image.Image}')";
                dbController.UpdateData(command);
            }
            return Ok();
        }









        // POST api/<ValuesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
