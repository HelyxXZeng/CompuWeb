create database CompuWeb

use CompuWeb

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
   ProductVariantId INT,
   Name NVARCHAR(50) COLLATE Vietnamese_CI_AS,
   Url NVARCHAR(255),
   FOREIGN KEY (ProductVariantId) REFERENCES ProductVariant(Id) ON DELETE CASCADE
);

CREATE TABLE ProductInstance (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   ProductVariantId INT,
   SerialNumber NVARCHAR(50) COLLATE Vietnamese_CI_AS,
   Status NVARCHAR(50),
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
   Value NVARCHAR(50) COLLATE Vietnamese_CI_AS,
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
   FOREIGN KEY (ProductVariantIdPromotion) REFERENCES ProductVariant(Id) ON DELETE CASCADE
);

-- Create the Đặt hàng table
CREATE TABLE Orders (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   CustomerId INT,
   Date DATETIME,
   Note NVARCHAR(255) COLLATE Vietnamese_CI_AS,
   Status NVARCHAR(50),
   Address NVARCHAR(255) COLLATE Vietnamese_CI_AS,
   FOREIGN KEY (CustomerId) REFERENCES Customer(Id)
);

CREATE TABLE OrderItem (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   ProductInstanceId INT,
   ProductVariantID INT,
   OrderId INT,
   FOREIGN KEY (ProductInstanceId) REFERENCES ProductInstance(Id) ON DELETE NO ACTION,
   FOREIGN KEY (ProductVariantID) REFERENCES ProductVariant(Id),
   FOREIGN KEY (OrderId) REFERENCES Orders(Id) ON DELETE CASCADE
);

CREATE TABLE PromotionUsage (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   PromotionId INT,
   OrderId INT,
   FOREIGN KEY (PromotionId) REFERENCES Promotion(Id) ON DELETE CASCADE,
   FOREIGN KEY (OrderId) REFERENCES Orders(Id) ON DELETE CASCADE
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

-- Create the Staff table
CREATE TABLE Staff (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   Name NVARCHAR(50) COLLATE Vietnamese_CI_AS,
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

-- Create the Manager table
CREATE TABLE Manager (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   Name NVARCHAR(50) COLLATE Vietnamese_CI_AS,
   Birthdate DATE,
   Gender NVARCHAR(10),
   IdCardNumber NVARCHAR(20),
   Address NVARCHAR(255) COLLATE Vietnamese_CI_AS,
   JoinDate DATE,
   PhoneNumber NVARCHAR(20),
   Position NVARCHAR(50) COLLATE Vietnamese_CI_AS,
   Salary DECIMAL(18, 2),
   Department NVARCHAR(50) COLLATE Vietnamese_CI_AS
);
ALTER DATABASE CompuWeb COLLATE SQL_Latin1_General_CP1_CI_AS;

---
ALTER TABLE Customer ALTER COLUMN Name NVARCHAR(50) COLLATE Vietnamese_CI_AS COLLATE Vietnamese_CI_AS;
select * from Customer
insert into Customer (Name, PhoneNumber, Birthdate, JoinDate) VALUES (N'Nguyễn Văn A', '0123456789', '2000-11-26', '2023-11-16')