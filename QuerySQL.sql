-- Jenis ENUM untuk peran (Role) pada tabel account 
CREATE TYPE user_role AS ENUM ('FisherMan', 'Traders');

-- CREATE TABLE Account (
--     AccoundID BIGSERIAL PRIMARY KEY NOT NULL,
--     Name VARCHAR(255),
--     Email VARCHAR(255) UNIQUE,
--     Password VARCHAR(255) UNIQUE,
--     Address VARCHAR(255),
--     Phone INT UNIQUE,
--     Role user_role
-- );

-- Tabel "Account_Traders"
CREATE TABLE Account_Traders (
    TradersID BIGSERIAL PRIMARY KEY NOT NULL,
    Name VARCHAR(255),
    Email VARCHAR(255) UNIQUE,
    Password VARCHAR(255) UNIQUE,
    Address VARCHAR(255),
    Phone INT UNIQUE,
    Role user_role
);

-- Tabel "Account_Fisherman"
CREATE TABLE Account_Fisherman (
    FishermanID BIGSERIAL PRIMARY KEY NOT NULL,
    Name VARCHAR(255),
    Email VARCHAR(255) UNIQUE,
    Address VARCHAR(255),
    Phone INT
    Role user_role
);


-- Tabel "Shopping_Cart"
CREATE TABLE Shopping_Cart (
    ShoppingCartID BIGSERIAL PRIMARY KEY NOT NULL,
    Created DATE,
    FOREIGN KEY (TradersID) REFERENCES Account_Traders (TradersID)
    -- FOREIGN KEY (AccoundID) REFERENCES Account (AccoundID)
);

-- Tabel "Reviews"
CREATE TABLE Reviews (
    ReviewID BIGSERIAL PRIMARY KEY NOT NULL,
    FOREIGN KEY (TradersID) REFERENCES Account_Traders (TradersID),
    -- FOREIGN KEY (AccoundID) REFERENCES Account (AccoundID),
    ReviewContent VARCHAR(255),
    Rating INT,
    FOREIGN KEY (ProductID) REFERENCES Product (ProductID)
);

-- Tabel "Product"
CREATE TABLE Product (
    ProductID BIGSERIAL PRIMARY KEY NOT NULL,
    ProductName VARCHAR(255),
    ProductCost INT,
    FOREIGN KEY (FishermanID) REFERENCES Account_Fisherman (FishermanID),
    FOREIGN KEY (TradersID) REFERENCES Account_Traders (TradersID),
    -- FOREIGN KEY (AccoundID) REFERENCES Account (AccoundID),
    PostedDate DATE,
    ProductIMG byte[], --bingung
    Description TEXT,
    CatchDate DATE
);

-- Tabel "Payment"
CREATE TABLE Payment (
    PaymentID BIGSERIAL PRIMARY KEY NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders (OrderID),
    Paid BOOLEAN,
    Total DECIMAL,
    Details TEXT
);

-- Tabel "Orders"
CREATE TABLE Orders (
    OrderID BIGSERIAL PRIMARY KEY NOT NULL,
    FOREIGN KEY (TradersID) REFERENCES Account_Traders (TradersID),
    FOREIGN KEY (FishermanID) REFERENCES Account_Fisherman (FishermanID),
    -- FOREIGN KEY (AccoundID) REFERENCES Account (AccoundID),
    FOREIGN KEY (ProductID) REFERENCES Product (ProductID),
    TotalAmount DECIMAL,
    OrderDate DATE,
    DeliveryDate DATE,
    DeliveryStatus TEXT
);
