create database CompuWeb
go
use CompuWeb
go
-- Create the Sản phẩm table
CREATE TABLE Category (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   Name NVARCHAR(50) COLLATE Vietnamese_CI_AS
);

CREATE TABLE Brand (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   Name NVARCHAR(50) COLLATE Vietnamese_CI_AS,
   Description NVARCHAR(255) COLLATE Vietnamese_CI_AS,
   Url NVARCHAR(255),
);

-- Create the Người dùng table
CREATE TABLE Customer (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   Name NVARCHAR(50) COLLATE Vietnamese_CI_AS,
   Birthdate DATE,
   JoinDate DATE,
   PhoneNumber NVARCHAR(20)
);

-- Create the Staff table
CREATE TABLE Staff (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   Name NVARCHAR(50) COLLATE Vietnamese_CI_AS,
   Avatar NVARCHAR(MAX),
   Birthdate DATE,
   Gender NVARCHAR(10),
   IdCardNumber NVARCHAR(20),
   Address NVARCHAR(255) COLLATE Vietnamese_CI_AS,
   JoinDate DATE,
   PhoneNumber NVARCHAR(20),
   Position NVARCHAR(50) COLLATE Vietnamese_CI_AS,
   Salary DECIMAL(18, 2),
   Other NVARCHAR(255) COLLATE Vietnamese_CI_AS
);

CREATE TABLE ProductLine (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   CategoryId INT,
   BrandId INT,
   Name NVARCHAR(50) COLLATE Vietnamese_CI_AS,
   ReleaseDate DATE,
   Warranty INT,
   Description NVARCHAR(255) COLLATE Vietnamese_CI_AS,
   FOREIGN KEY (CategoryId) REFERENCES Category(Id) ON DELETE CASCADE,
   FOREIGN KEY (BrandId) REFERENCES Brand(Id) ON DELETE CASCADE
);

CREATE TABLE ProductVariant (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   ProductLineId INT,
   Name NVARCHAR(50) COLLATE Vietnamese_CI_AS,
   FOREIGN KEY (ProductLineId) REFERENCES ProductLine(Id) ON DELETE CASCADE
);

CREATE TABLE ProductImage (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   ProductLineId INT,
   Name NVARCHAR(50) COLLATE Vietnamese_CI_AS,
   Url NVARCHAR(255),
   FOREIGN KEY (ProductLineId) REFERENCES ProductLine(Id) ON DELETE CASCADE
);

CREATE TABLE ProductInstance (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   ProductVariantId INT,
   SerialNumber NVARCHAR(50) COLLATE Vietnamese_CI_AS,
   Status NVARCHAR(150),
   Available BIT,
   FOREIGN KEY (ProductVariantId) REFERENCES ProductVariant(Id) ON DELETE CASCADE
);

CREATE TABLE SpecificationType (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   Name NVARCHAR(50) COLLATE Vietnamese_CI_AS
);

CREATE TABLE Specification (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   SpecificationTypeId INT,
   Value NVARCHAR(255) COLLATE Vietnamese_CI_AS,
   FOREIGN KEY (SpecificationTypeId) REFERENCES SpecificationType(Id) ON DELETE CASCADE
);

CREATE TABLE ProductSpecification (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   ProductVariantId INT,
   SpecificationId INT,
   FOREIGN KEY (ProductVariantId) REFERENCES ProductVariant(Id) ON DELETE CASCADE,
   FOREIGN KEY (SpecificationId) REFERENCES Specification(Id) ON DELETE CASCADE
);

CREATE TABLE Period (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   StartDate DATE,
   EndDate DATE
);

CREATE TABLE Price (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   ProductVariantId INT,
   StartDate DATE,
   EndDate DATE,
   Value DECIMAL(18, 2),
   Status NVARCHAR(50),
   FOREIGN KEY (ProductVariantId) REFERENCES ProductVariant(Id) ON DELETE CASCADE,
);

-- Create the Khuyến mãi table
CREATE TABLE Promotion (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   Name NVARCHAR(50) COLLATE Vietnamese_CI_AS,
   StartDate DATE,
   EndDate DATE,
   ProductVariantIdPurchase INT,
   ProductVariantIdPromotion INT,
   Content NVARCHAR(255) COLLATE Vietnamese_CI_AS,
   Value DECIMAL(18, 2),
   Status NVARCHAR(50),
   FOREIGN KEY (ProductVariantIdPurchase) REFERENCES ProductVariant(Id) ON DELETE NO ACTION,
   FOREIGN KEY (ProductVariantIdPromotion) REFERENCES ProductVariant(Id) ON DELETE NO ACTION
);

-- Create the Đặt hàng table
CREATE TABLE Orders (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   CustomerId INT,
   StaffId INT,
   Date DATETIME,
   Note NVARCHAR(255) COLLATE Vietnamese_CI_AS,
   Status NVARCHAR(50),
   Address NVARCHAR(255) COLLATE Vietnamese_CI_AS,
   Total DECIMAL(18, 2),
   FOREIGN KEY (CustomerId) REFERENCES Customer(Id),
   FOREIGN KEY (StaffId) REFERENCES Staff(Id)
);

CREATE TABLE OrderItem (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   ProductInstanceId INT,
   PromotionId INT NULL,
   PriceId INT,
   OrderId INT,
   FOREIGN KEY (ProductInstanceId) REFERENCES ProductInstance(Id) ON DELETE NO ACTION,
   FOREIGN KEY (OrderId) REFERENCES Orders(Id) ON DELETE CASCADE,
   FOREIGN KEY (PromotionId) REFERENCES Promotion(Id) ON DELETE NO ACTION,
   FOREIGN KEY (PriceId) REFERENCES Price(Id) ON DELETE NO ACTION
);

CREATE TABLE PromotionUsage (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   PromotionId INT,
   OrderId INT,
   FOREIGN KEY (PromotionId) REFERENCES Promotion(Id) ON DELETE CASCADE,
   FOREIGN KEY (OrderId) REFERENCES Orders(Id) ON DELETE CASCADE
);

CREATE TABLE PriceUsage (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   PriceId INT,
   OrderItemId INT,
   FOREIGN KEY (PriceId) REFERENCES Price(Id) ON DELETE CASCADE,
   FOREIGN KEY (OrderItemId) REFERENCES OrderItem(Id) ON DELETE CASCADE
);

-- Create the Đánh giá table
CREATE TABLE Rating (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   OrderItemId INT,
   Date DATE,
   Rating INT,
   Status NVARCHAR(50),
   Comment NVARCHAR(255) COLLATE Vietnamese_CI_AS,
   FOREIGN KEY (OrderItemId) REFERENCES OrderItem(Id) ON DELETE CASCADE
);

-- Create the Hoàn trả hàng table
CREATE TABLE ReturnOrderItem (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   OrderItemId INT,
   Price DECIMAL(18, 2),
   Date DATE,
   Issues NVARCHAR(255) COLLATE Vietnamese_CI_AS,
   Status NVARCHAR(50),
   FOREIGN KEY (OrderItemId) REFERENCES OrderItem(Id) ON DELETE CASCADE
);

-- Create the Giỏ hàng table
CREATE TABLE CartItem (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   ProductVariantId INT,
   CustomerId INT,
   Quantity INT,
   FOREIGN KEY (ProductVariantId) REFERENCES ProductVariant(Id) ON DELETE CASCADE,
   FOREIGN KEY (CustomerId) REFERENCES Customer(Id) ON DELETE CASCADE
);

-- Create the Manager table
CREATE TABLE Manager (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   Name NVARCHAR(50) COLLATE Vietnamese_CI_AS,
   Avatar NVARCHAR(MAX),
   Birthdate DATE,
   Gender NVARCHAR(10),
   IdCardNumber NVARCHAR(20),
   Address NVARCHAR(255) COLLATE Vietnamese_CI_AS,
   JoinDate DATE,
   PhoneNumber NVARCHAR(20),
   Position NVARCHAR(50) COLLATE Vietnamese_CI_AS,
   Salary DECIMAL(18, 2),
   Department NVARCHAR(50) COLLATE Vietnamese_CI_AS,
   Other NVARCHAR(255) COLLATE Vietnamese_CI_AS,
);
ALTER DATABASE CompuWeb COLLATE SQL_Latin1_General_CP1_CI_AS;

alter table Brand
alter column Url NVARCHAR(MAX)

alter table ProductImage
alter column Url NVARCHAR(MAX)

--- for Created Database


---
alter table Orders
add ReceiveMethod NVARCHAR(50)

---

use CompuWeb
ALTER TABLE Customer ALTER COLUMN Name NVARCHAR(50) COLLATE Vietnamese_CI_AS;
--select * from Customer
--insert into Customer (Name, PhoneNumber, Birthdate, JoinDate) VALUES (N'Nguyễn Văn A', '0123456789', '2000-11-26', '2023-11-16')
--alter table ProductInstance
--alter column Status NVARCHAR(150)
--select count(*) as ColumnCount from Category where Id = 1 and Name = 'Hi'
--select Id, Name from Category
--select * from Price where Status = 'ACTIVE' and ProductVariantId = 1

--select * from OrderItem
--drop database CompuWeb

--select MAX(Id) from Orders

--select * from ProductVariant
 

select * from Specification

SELECT r.*
FROM Rating r
JOIN OrderItem oi ON r.OrderItemId = oi.Id
JOIN ProductInstance pi ON oi.ProductInstanceId = pi.Id
JOIN ProductVariant pv ON pi.ProductVariantId = pv.Id
WHERE pv.Id = 1;

select i.*
from ProductImage i
join ProductLine pl on i.ProductLineId = pl.Id
join ProductVariant pv on pv.ProductLineId = pl.Id
where pv.Id = 1

select pv1.*
from ProductVariant pv1 
join ProductLine pl on pv1.ProductLineId = pl.Id
join ProductVariant pv2 on pv2.ProductLineId = pl.Id
where pv2.Id = 1 and pv1.Id <> 1

select Name
from Customer c
join Orders o on o.CustomerId = c.Id
join OrderItem oi on oi.OrderId = o.Id
join Rating r on r.OrderItemId = oi.Id
where r.Id = 1

select * from Specification where SpecificationTypeId = 1

select Name
from ProductVariant pv
join ProductInstance pi on pi.ProductVariantId = pv.Id
join OrderItem oi on oi.ProductInstanceId = pi.Id
where oi.Id = 1

select p.ProductVariantId, Value
from Price p
join ProductVariant pv on pv.Id = p.ProductVariantId
join ProductInstance pi on pi.ProductVariantId = pv.Id
join OrderItem oi on oi.ProductInstanceId = pi.Id
where oi.Id = 1

select pv.Id, pv.Name, p.Value as Price
from ProductVariant pv
join Price p on p.ProductVariantId = pv.Id
where pv.Id = 1

select pi.Id, pi.Name, pi.Url as Image
from ProductImage pi
join ProductLine pl on pi.ProductLineId = pl.Id
join ProductVariant pv on pv.ProductLineId = pl.Id
where pv.Id = 1

select top 10 c.Id, c.Name, c.PhoneNumber, Sum(o.Total) as Total
from Customer c
join Orders o on o.CustomerId = c.Id
where c.Id = 1
group by c.Id, c.Name, c.PhoneNumber
order by Total desc

update Promotion set Status = 'INACTIVE' where Id = 1

select count(*) from Customer where Month(JoinDate) = 11 and Year(JoinDate) = 2022

select * from Specification where Value like '%8GB%'

select ProductVariantId
from ProductSpecification ps
join Specification s on ps.SpecificationId = s.Id
where (s.SpecificationTypeId = 1 and Value like '%8GB%') or (s.SpecificationTypeId = 2 and Value like '%256GB%')

SELECT pv.Id
FROM ProductVariant pv
INNER JOIN ProductSpecification ps ON pv.Id = ps.ProductVariantId
INNER JOIN Specification s ON ps.SpecificationId = s.Id
INNER JOIN ProductLine pl ON pl.Id = pv.ProductLineId
INNER JOIN Brand b ON b.Id = pl.BrandId
WHERE 
    (
        (s.SpecificationTypeId = 1 AND s.Value LIKE '%16GB%')
        OR
        (s.SpecificationTypeId = 2 AND s.Value LIKE '%512GB%')
        OR
        (s.SpecificationTypeId = 3 AND s.Value LIKE '%i5%')
    )
    AND b.Id = 1
	AND pl.CategoryId = 1
GROUP BY pv.Id
HAVING COUNT(DISTINCT s.SpecificationTypeId) = 3;

select o.Id, r.Rating, r.Date, r.Comment, c.Name
from Rating r
join OrderItem oi on r.OrderItemId = oi.Id
join Orders o on oi.OrderId = o.Id
join Customer c on o.CustomerId = c.Id
join ProductInstance pi on oi.ProductInstanceId = pi.Id
join ProductVariant pv on pi.ProductVariantId = pv.Id
where pv.Id = 1

SELECT
    o.Id,
    c.Name,
    o.Date,
    o.Status,
    o.Total,
    COUNT(oi.Id) as ItemCount,
    VariantName.Name AS VariantName,
    ImageUrl.Url AS Image
FROM Orders o
JOIN Customer c ON o.CustomerId = c.Id
JOIN OrderItem oi ON oi.OrderId = o.Id
OUTER APPLY (
    SELECT TOP 1 pv.Name AS Name
    FROM OrderItem oi_inner
    JOIN ProductInstance pi ON oi_inner.ProductInstanceId = pi.Id
    JOIN ProductVariant pv ON pv.Id = pi.ProductVariantId
    WHERE oi_inner.OrderId = o.Id
    ORDER BY oi_inner.Id -- Assuming there's an ID or another field indicating the order of items
) AS VariantName
OUTER APPLY (
    SELECT TOP 1 images.Url AS Url
    FROM OrderItem oi_inner
    JOIN ProductInstance pi ON oi_inner.ProductInstanceId = pi.Id
    JOIN ProductVariant pv ON pv.Id = pi.ProductVariantId
    JOIN ProductLine pl ON pl.Id = pv.ProductLineId
    JOIN ProductImage images ON images.ProductLineId = pl.Id
    WHERE oi_inner.OrderId = o.Id
    ORDER BY oi_inner.Id -- Assuming there's an ID or another field indicating the order of items
) AS ImageUrl
WHERE c.PhoneNumber = '+841234567890'
GROUP BY o.Id, o.CustomerId, o.Date, o.Status, o.Total, c.Name, VariantName.Name, ImageUrl.Url;

SELECT
    o.Id AS 'Id',
    c.Name AS 'Name',
    o.Date AS 'Date',
    o.Status AS 'Status',
    o.Total AS 'Total',
    COUNT(oi.Id) as 'ItemCount',
    PV.Name AS 'VariantName',
    PI.Url AS 'Image'
FROM Orders o
JOIN Customer c ON o.CustomerId = c.Id
LEFT JOIN OrderItem oi ON oi.OrderId = o.Id
LEFT JOIN 
    (
        SELECT 
            oi.OrderId,
            MIN(pv.Name) AS Name
        FROM 
            OrderItem oi
        JOIN 
            ProductInstance pi ON oi.ProductInstanceId = pi.Id
        JOIN 
            ProductVariant pv ON pi.ProductVariantId = pv.Id
        GROUP BY 
            oi.OrderId
    ) PV ON o.Id = PV.OrderId
LEFT JOIN 
    (
        SELECT 
            oi.OrderId,
            MIN(pim.Url) AS Url
        FROM 
            OrderItem oi
        JOIN 
            ProductInstance pi ON oi.ProductInstanceId = pi.Id
        JOIN 
            ProductVariant pv ON pi.ProductVariantId = pv.Id
        JOIN 
            ProductImage pim ON pv.Id = pim.ProductLineId
        GROUP BY 
            oi.OrderId
    ) PI ON o.Id = PI.OrderId
WHERE 
    c.PhoneNumber = '+841234567890'
GROUP BY 
    o.Id, c.Name, o.Date, o.Status, o.Total, PV.Name, PI.Url;

select distinct o.*, c.Name
from Orders o
join Customer c on o.CustomerId = c.Id
join OrderItem oi on oi.OrderId = o.Id
where c.PhoneNumber = '+841234567890'

select count(oi.Id) as ItemCount
from OrderItem oi
where oi.OrderId = 3

select top 1 pv.Name, pv.Id
from ProductVariant pv
join ProductInstance pi on pi.ProductVariantId = pv.Id
join OrderItem oi on pi.Id = oi.ProductInstanceId
join Orders o on oi.OrderId = o.Id
where o.Id = 3

select top 1 pi.Url as Image
from ProductImage pi
join ProductLine pl on pi.ProductLineId = pl.Id
join ProductVariant pv on pv.ProductLineId = pl.Id
where pv.Id = 1

select * from Rating

SELECT r.*
FROM Rating r
JOIN OrderItem oi ON r.OrderItemId = oi.Id
JOIN ProductInstance pi ON oi.ProductInstanceId = pi.Id
JOIN ProductVariant pv ON pi.ProductVariantId = pv.Id
WHERE pv.Id = ProductVariantId and r.Status = 'APPROVED'

SELECT r.*
FROM Rating r
JOIN OrderItem oi ON r.OrderItemId = oi.Id
JOIN ProductInstance pi ON oi.ProductInstanceId = pi.Id
JOIN ProductVariant pv ON pi.ProductVariantId = pv.Id
WHERE pv.Id = 1 and r.Status = 'APPROVED'

select pv.Id, Name
from ProductVariant pv
join ProductInstance pi on pi.ProductVariantId = pv.Id
join OrderItem oi on oi.ProductInstanceId = pi.Id
where oi.Id = 1

select distinct pv.*
from ProductVariant pv
join ProductInstance pi on pi.ProductVariantId = pv.Id
join ProductLine pl on pl.Id = pv.ProductLineId
join OrderItem oi on oi.ProductInstanceId = pi.Id
join Orders o on oi.OrderId = o.Id
where o.Id = 3

select r.*, pv.Name as ProductVariantName
from Rating r
join OrderItem oi on r.OrderItemId = oi.Id
join ProductInstance pi on oi.ProductInstanceId = pi.Id
join ProductVariant pv on pi.ProductVariantId = pv.Id

select roi.*, pv.Name as ProductVariantName, c.Name as CustomerName
from ReturnOrderItem roi
join OrderItem oi on roi.OrderItemId = oi.Id
join ProductInstance pi on oi.ProductInstanceId = pi.Id
join ProductVariant pv on pi.ProductVariantId = pv.Id
join Orders o on oi.OrderId = o.Id
join Customer c on o.CustomerId = c.Id

select * from Price p
join ProductVariant pv on p.ProductVariantId = pv.Id

select oi.Id from OrderItem oi
join ProductInstance pi on pi.Id = oi.ProductInstanceId
join ProductVariant pv on pv.Id = pi.ProductVariantId
join Orders o on oi.OrderId = o.Id
where pv.Id = 1 and o.Id = 3

select * from Promotion

select * from ReturnOrderItem

select * from Rating

select * from OrderItem

SELECT COUNT(DISTINCT o.Id) AS OrdersWithPromotion
FROM Orders o
INNER JOIN OrderItem oi ON o.Id = oi.OrderId
INNER JOIN Promotion p ON oi.PromotionId = p.Id
WHERE oi.PromotionId = 1
AND o.Date BETWEEN p.StartDate AND p.EndDate;

INSERT INTO Price (ProductVariantId, StartDate, EndDate, Status, Value) VALUES (1, '2023-12-15', '2026-12-31', 'CANCELED', 9999999.00)

--select * from Specification

--SELECT r.*
--FROM Rating r
--JOIN OrderItem oi ON r.OrderItemId = oi.Id
--JOIN ProductInstance pi ON oi.ProductInstanceId = pi.Id
--JOIN ProductVariant pv ON pi.ProductVariantId = pv.Id
--WHERE pv.Id = 1;

--select i.*
--from ProductImage i
--join ProductLine pl on i.ProductLineId = pl.Id
--join ProductVariant pv on pv.ProductLineId = pl.Id
--where pv.Id = 1

--select pv1.*
--from ProductVariant pv1 
--join ProductLine pl on pv1.ProductLineId = pl.Id
--join ProductVariant pv2 on pv2.ProductLineId = pl.Id
--where pv2.Id = 1 and pv1.Id <> 1

--select Name
--from Customer c
--join Orders o on o.CustomerId = c.Id
--join OrderItem oi on oi.OrderId = o.Id
--join Rating r on r.OrderItemId = oi.Id
--where r.Id = 1

--select * from Specification where SpecificationTypeId = 1

--select Name
--from ProductVariant pv
--join ProductInstance pi on pi.ProductVariantId = pv.Id
--join OrderItem oi on oi.ProductInstanceId = pi.Id
--where oi.Id = 1

--select p.ProductVariantId, Value
--from Price p
--join ProductVariant pv on pv.Id = p.ProductVariantId
--join ProductInstance pi on pi.ProductVariantId = pv.Id
--join OrderItem oi on oi.ProductInstanceId = pi.Id
--where oi.Id = 1

--select pv.Id, pv.Name, p.Value as Price
--from ProductVariant pv
--join Price p on p.ProductVariantId = pv.Id
--where pv.Id = 1

--select pi.Id, pi.Name, pi.Url as Image
--from ProductImage pi
--join ProductLine pl on pi.ProductLineId = pl.Id
--join ProductVariant pv on pv.ProductLineId = pl.Id
--where pv.Id = 1

--select top 10 c.Id, c.Name, c.PhoneNumber, Sum(o.Total) as Total
--from Customer c
--join Orders o on o.CustomerId = c.Id
--where c.Id = 1
--group by c.Id, c.Name, c.PhoneNumber
--order by Total desc

--update Promotion set Status = 'INACTIVE' where Id = 1

--select count(*) from Customer where Month(JoinDate) = 11 and Year(JoinDate) = 2022

--select * from Specification where Value like '%8GB%'

--select ProductVariantId
--from ProductSpecification ps
--join Specification s on ps.SpecificationId = s.Id
--where (s.SpecificationTypeId = 1 and Value like '%8GB%') or (s.SpecificationTypeId = 2 and Value like '%256GB%')

--SELECT pv.Id
--FROM ProductVariant pv
--INNER JOIN ProductSpecification ps ON pv.Id = ps.ProductVariantId
--INNER JOIN Specification s ON ps.SpecificationId = s.Id
--INNER JOIN ProductLine pl ON pl.Id = pv.ProductLineId
--INNER JOIN Brand b ON b.Id = pl.BrandId
--WHERE 
--    (
--        (s.SpecificationTypeId = 1 AND s.Value LIKE '%16GB%')
--        OR
--        (s.SpecificationTypeId = 2 AND s.Value LIKE '%512GB%')
--        OR
--        (s.SpecificationTypeId = 3 AND s.Value LIKE '%i5%')
--    )
--    AND b.Id = 1
--	AND pl.CategoryId = 1
--GROUP BY pv.Id
--HAVING COUNT(DISTINCT s.SpecificationTypeId) = 3;

--select o.Id, r.Rating, r.Date, r.Comment, c.Name
--from Rating r
--join OrderItem oi on r.OrderItemId = oi.Id
--join Orders o on oi.OrderId = o.Id
--join Customer c on o.CustomerId = c.Id
--join ProductInstance pi on oi.ProductInstanceId = pi.Id
--join ProductVariant pv on pi.ProductVariantId = pv.Id
--where pv.Id = 1

--SELECT
--    o.Id,
--    c.Name,
--    o.Date,
--    o.Status,
--    o.Total,
--    COUNT(oi.Id) as ItemCount,
--    VariantName.Name AS VariantName,
--    ImageUrl.Url AS Image
--FROM Orders o
--JOIN Customer c ON o.CustomerId = c.Id
--JOIN OrderItem oi ON oi.OrderId = o.Id
--OUTER APPLY (
--    SELECT TOP 1 pv.Name AS Name
--    FROM OrderItem oi_inner
--    JOIN ProductInstance pi ON oi_inner.ProductInstanceId = pi.Id
--    JOIN ProductVariant pv ON pv.Id = pi.ProductVariantId
--    WHERE oi_inner.OrderId = o.Id
--    ORDER BY oi_inner.Id -- Assuming there's an ID or another field indicating the order of items
--) AS VariantName
--OUTER APPLY (
--    SELECT TOP 1 images.Url AS Url
--    FROM OrderItem oi_inner
--    JOIN ProductInstance pi ON oi_inner.ProductInstanceId = pi.Id
--    JOIN ProductVariant pv ON pv.Id = pi.ProductVariantId
--    JOIN ProductLine pl ON pl.Id = pv.ProductLineId
--    JOIN ProductImage images ON images.ProductLineId = pl.Id
--    WHERE oi_inner.OrderId = o.Id
--    ORDER BY oi_inner.Id -- Assuming there's an ID or another field indicating the order of items
--) AS ImageUrl
--WHERE c.PhoneNumber = '+841234567890'
--GROUP BY o.Id, o.CustomerId, o.Date, o.Status, o.Total, c.Name, VariantName.Name, ImageUrl.Url;

--SELECT
--    o.Id AS 'Id',
--    c.Name AS 'Name',
--    o.Date AS 'Date',
--    o.Status AS 'Status',
--    o.Total AS 'Total',
--    COUNT(oi.Id) as 'ItemCount',
--    PV.Name AS 'VariantName',
--    PI.Url AS 'Image'
--FROM Orders o
--JOIN Customer c ON o.CustomerId = c.Id
--LEFT JOIN OrderItem oi ON oi.OrderId = o.Id
--LEFT JOIN 
--    (
--        SELECT 
--            oi.OrderId,
--            MIN(pv.Name) AS Name
--        FROM 
--            OrderItem oi
--        JOIN 
--            ProductInstance pi ON oi.ProductInstanceId = pi.Id
--        JOIN 
--            ProductVariant pv ON pi.ProductVariantId = pv.Id
--        GROUP BY 
--            oi.OrderId
--    ) PV ON o.Id = PV.OrderId
--LEFT JOIN 
--    (
--        SELECT 
--            oi.OrderId,
--            MIN(pim.Url) AS Url
--        FROM 
--            OrderItem oi
--        JOIN 
--            ProductInstance pi ON oi.ProductInstanceId = pi.Id
--        JOIN 
--            ProductVariant pv ON pi.ProductVariantId = pv.Id
--        JOIN 
--            ProductImage pim ON pv.Id = pim.ProductLineId
--        GROUP BY 
--            oi.OrderId
--    ) PI ON o.Id = PI.OrderId
--WHERE 
--    c.PhoneNumber = '+841234567890'
--GROUP BY 
--    o.Id, c.Name, o.Date, o.Status, o.Total, PV.Name, PI.Url;

--select distinct o.*, c.Name
--from Orders o
--join Customer c on o.CustomerId = c.Id
--join OrderItem oi on oi.OrderId = o.Id
--where c.PhoneNumber = '+841234567890'

--select count(oi.Id) as ItemCount
--from OrderItem oi
--where oi.OrderId = 3

--select top 1 pv.Name, pv.Id
--from ProductVariant pv
--join ProductInstance pi on pi.ProductVariantId = pv.Id
--join OrderItem oi on pi.Id = oi.ProductInstanceId
--join Orders o on oi.OrderId = o.Id
--where o.Id = 3

--select top 1 pi.Url as Image
--from ProductImage pi
--join ProductLine pl on pi.ProductLineId = pl.Id
--join ProductVariant pv on pv.ProductLineId = pl.Id
--where pv.Id = 1

--select * from Rating

--SELECT r.*
--FROM Rating r
--JOIN OrderItem oi ON r.OrderItemId = oi.Id
--JOIN ProductInstance pi ON oi.ProductInstanceId = pi.Id
--JOIN ProductVariant pv ON pi.ProductVariantId = pv.Id
--WHERE pv.Id = ProductVariantId and r.Status = 'APPROVED'

--SELECT r.*
--FROM Rating r
--JOIN OrderItem oi ON r.OrderItemId = oi.Id
--JOIN ProductInstance pi ON oi.ProductInstanceId = pi.Id
--JOIN ProductVariant pv ON pi.ProductVariantId = pv.Id
--WHERE pv.Id = 1 and r.Status = 'APPROVED'

--select pv.Id, Name
--from ProductVariant pv
--join ProductInstance pi on pi.ProductVariantId = pv.Id
--join OrderItem oi on oi.ProductInstanceId = pi.Id
--where oi.Id = 1

--select distinct pv.*
--from ProductVariant pv
--join ProductInstance pi on pi.ProductVariantId = pv.Id
--join ProductLine pl on pl.Id = pv.ProductLineId
--join OrderItem oi on oi.ProductInstanceId = pi.Id
--join Orders o on oi.OrderId = o.Id
--where o.Id = 3

--select r.*, pv.Name as ProductVariantName
--from Rating r
--join OrderItem oi on r.OrderItemId = oi.Id
--join ProductInstance pi on oi.ProductInstanceId = pi.Id
--join ProductVariant pv on pi.ProductVariantId = pv.Id

--select roi.*, pv.Name as ProductVariantName, c.Name as CustomerName
--from ReturnOrderItem roi
--join OrderItem oi on roi.OrderItemId = oi.Id
--join ProductInstance pi on oi.ProductInstanceId = pi.Id
--join ProductVariant pv on pi.ProductVariantId = pv.Id
--join Orders o on oi.OrderId = o.Id
--join Customer c on o.CustomerId = c.Id

--select * from Price p
--join ProductVariant pv on p.ProductVariantId = pv.Id

--select oi.Id from OrderItem oi
--join ProductInstance pi on pi.Id = oi.ProductInstanceId
--join ProductVariant pv on pv.Id = pi.ProductVariantId
--join Orders o on oi.OrderId = o.Id
--where pv.Id = 1 and o.Id = 3

--INSERT INTO Price (ProductVariantId, StartDate, EndDate, Status, Value) VALUES (1, '2023-12-15', '2026-12-31', 'CANCELED', 9999999.00)
