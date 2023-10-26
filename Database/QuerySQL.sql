-- Jenis ENUM untuk peran (Role) pada tabel account 
CREATE TYPE user_role AS ENUM (
    'FisherMan', 
    'Traders'
);

-- Jenis ENUM untuk delivery status pada table orders
CREATE TYPE delivery_status_enum AS ENUM (
    'Pending',
    'Processing',
    'Shipped',
    'Delivered',
    'Canceled'
);

-- Jenis ENUM untuk Details pada table Payment
CREATE TYPE payment_details_enum AS ENUM (
    'Credit Card',
    'Debit Card',
    'PayPal',
    'Bank Transfer',
    'Cash'
);

CREATE TABLE Account (
    AccountID BIGINT PRIMARY KEY NOT NULL,
    Name VARCHAR(255),
    Email VARCHAR(255) UNIQUE,
    Password VARCHAR(255) UNIQUE,
    Address VARCHAR(255),
    Phone INT UNIQUE,
    Role user_role
);

-- -- Tabel "Account_Traders"
-- CREATE TABLE Account_Traders (
--     TradersID BIGSERIAL PRIMARY KEY NOT NULL UNIQUE,
--     Name VARCHAR(255),
--     Email VARCHAR(255) UNIQUE,
--     Password VARCHAR(255) UNIQUE,
--     Address VARCHAR(255),
--     Phone INT UNIQUE,
--     Role user_role
-- );

-- -- Tabel "Account_Fisherman"
-- CREATE TABLE Account_Fisherman (
--     FishermanID BIGSERIAL PRIMARY KEY NOT NULL UNIQUE,
--     Name VARCHAR(255),
--     Email VARCHAR(255) UNIQUE,
--     Password VARCHAR(255) UNIQUE,
--     Address VARCHAR(255),
--     Phone INT UNIQUE,
--     Role user_role
-- );

-- CREATE TABLE Chat (
--     ChatID BIGSERIAL PRIMARY KEY NOT NULL UNIQUE,
--     SenderID BIGINT, -- ID pengirim pesan
--     ReceiverID BIGINT, -- ID penerima pesan
--     Message TEXT, -- Isi pesan
--     Timestamp TIMESTAMP, -- Waktu pengiriman pesan
--     FOREIGN KEY (SenderID) REFERENCES Account_Fisherman (FishermanID),
--     FOREIGN KEY (ReceiverID) REFERENCES Account_Traders (TradersID)
-- );

-- Tabel "Product"
CREATE TABLE Product (
    ProductID BIGINT PRIMARY KEY NOT NULL UNIQUE,
    ProductName VARCHAR(255),
    ProductCost INT,
    AccountID BIGINT, -- Kolom untuk kunci asing
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID),
    PostedDate DATE,
    ProductIMG bytea, 
    Description VARCHAR(255),
    CatchDate DATE
);

-- Tabel "Shopping_Cart"
CREATE TABLE Shopping_Cart (
    ShoppingCartID BIGINT PRIMARY KEY NOT NULL UNIQUE,
    Created DATE,
    AccountID BIGINT, -- Kolom untuk kunci asing
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID)
);

-- Tabel "Reviews"
CREATE TABLE Reviews (
    ReviewID BIGINT PRIMARY KEY NOT NULL UNIQUE,
    AccountID BIGINT, -- Kolom untuk kunci asing
    FOREIGN KEY (AccountID) REFERENCES Account (AccountID),
    ReviewContent VARCHAR(255),
    Rating INT
);

-- Tabel "Orders"
CREATE TABLE Orders (
    OrderID BIGINT PRIMARY KEY NOT NULL UNIQUE,
    AccountID BIGINT, -- Kolom untuk kunci asing
    ProductID BIGINT,
    FOREIGN KEY (AccountID) REFERENCES Account (AccountID),
    FOREIGN KEY (ProductID) REFERENCES Product (ProductID),
    TotalAmount DECIMAL,
    OrderDate DATE,
    DeliveryDate DATE,
    DeliveryStatus delivery_status_enum
);

-- Tabel "Payment"
CREATE TABLE Payment (
    PaymentID BIGSERIAL PRIMARY KEY NOT NULL UNIQUE,
    OrderID BIGINT,
    FOREIGN KEY (OrderID) REFERENCES Orders (OrderID),
    Paid BOOLEAN,
    Total DECIMAL,
    Details payment_details_enum
);


