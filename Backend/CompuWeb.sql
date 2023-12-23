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

alter table Orders
add column ReceiveMethod NVARCHAR(50)
---

use CompuWeb
ALTER TABLE Customer ALTER COLUMN Name NVARCHAR(50) COLLATE Vietnamese_CI_AS;
select * from Customer
insert into Customer (Name, PhoneNumber, Birthdate, JoinDate) VALUES (N'Nguyễn Văn A', '0123456789', '2000-11-26', '2023-11-16')
alter table ProductInstance
alter column Status NVARCHAR(150)
select count(*) as ColumnCount from Category where Id = 1 and Name = 'Hi'
select Id, Name from Category
select * from Price where Status = 'ACTIVE' and ProductVariantId = 1

select * from OrderItem
drop database CompuWeb

select MAX(Id) from Orders

select * from ProductVariant
 
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

select * from Price

select Id from ProductInstance where ProductVariantId = 1 and Available = 1

select * from ProductInstance

select * from OrderItem

select * from Customer

select * from Staff

INSERT INTO Price (ProductVariantId, StartDate, EndDate, Status, Value) VALUES (1, '2023-12-15', '2026-12-31', 'CANCELED', 9999999.00)
