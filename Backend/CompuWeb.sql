create database CompuWeb

use CompuWeb

-- Create the Sản phẩm table
CREATE TABLE Category (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   Name VARCHAR(50)
);

CREATE TABLE Brand (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   Name VARCHAR(50),
   Description VARCHAR(255),
   Url VARCHAR(255),
);

-- Create the Người dùng table
CREATE TABLE Customer (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   Name VARCHAR(50),
   Birthdate DATE,
   JoinDate DATE,
   PhoneNumber VARCHAR(20)
);

CREATE TABLE ProductLine (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   CategoryId INT,
   BrandId INT,
   Name VARCHAR(50),
   ReleaseDate DATE,
   Warranty INT,
   Description VARCHAR(255),
   FOREIGN KEY (CategoryId) REFERENCES Category(Id) ON DELETE CASCADE,
   FOREIGN KEY (BrandId) REFERENCES Brand(Id) ON DELETE CASCADE
);

CREATE TABLE ProductVariant (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   ProductLineId INT,
   Name VARCHAR(50),
   FOREIGN KEY (ProductLineId) REFERENCES ProductLine(Id) ON DELETE CASCADE
);

CREATE TABLE ProductImage (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   ProductVariantId INT,
   Name VARCHAR(50),
   Url VARCHAR(255),
   FOREIGN KEY (ProductVariantId) REFERENCES ProductVariant(Id) ON DELETE CASCADE
);

CREATE TABLE ProductInstance (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   ProductVariantId INT,
   SerialNumber VARCHAR(50),
   Status VARCHAR(50),
   Available BIT,
   FOREIGN KEY (ProductVariantId) REFERENCES ProductVariant(Id) ON DELETE CASCADE
);

CREATE TABLE SpecificationType (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   Name VARCHAR(50)
);

CREATE TABLE Specification (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   SpecificationTypeId INT,
   Value VARCHAR(50),
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
   Status VARCHAR(50),
   FOREIGN KEY (ProductVariantId) REFERENCES ProductVariant(Id) ON DELETE CASCADE,
);

-- Create the Khuyến mãi table
CREATE TABLE Promotion (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   Name VARCHAR(50),
   StartDate DATE,
   EndDate DATE,
   ProductVariantIdPurchase INT,
   ProductVariantIdPromotion INT,
   Content VARCHAR(255),
   Value DECIMAL(18, 2),
   Status VARCHAR(50),
   FOREIGN KEY (ProductVariantIdPurchase) REFERENCES ProductVariant(Id) ON DELETE NO ACTION,
   FOREIGN KEY (ProductVariantIdPromotion) REFERENCES ProductVariant(Id) ON DELETE CASCADE
);

-- Create the Đặt hàng table
CREATE TABLE Orders (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   CustomerId INT,
   Date DATETIME,
   Note VARCHAR(255),
   Status VARCHAR(50),
   Address VARCHAR(255),
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
   Comment VARCHAR(255),
   FOREIGN KEY (OrderItemId) REFERENCES OrderItem(Id) ON DELETE CASCADE
);

-- Create the Hoàn trả hàng table
CREATE TABLE ReturnOrderItem (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   OrderItemId INT,
   Price DECIMAL(18, 2),
   Date DATE,
   Issues VARCHAR(255),
   Status VARCHAR(50),
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
   Name VARCHAR(50),
   Birthdate DATE,
   Gender VARCHAR(10),
   IdCardNumber VARCHAR(20),
   Address VARCHAR(255),
   JoinDate DATE,
   PhoneNumber VARCHAR(20),
   Position VARCHAR(50),
   Salary DECIMAL(18, 2),
   Other VARCHAR(255)
);

-- Create the Manager table
CREATE TABLE Manager (
   Id INT IDENTITY(1,1) PRIMARY KEY,
   Name VARCHAR(50),
   Birthdate DATE,
   Gender VARCHAR(10),
   IdCardNumber VARCHAR(20),
   Address VARCHAR(255),
   JoinDate DATE,
   PhoneNumber VARCHAR(20),
   Position VARCHAR(50),
   Salary DECIMAL(18, 2),
   Department VARCHAR(50)
);