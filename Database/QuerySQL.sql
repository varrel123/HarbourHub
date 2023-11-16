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
    AccountID BIGSERIAL PRIMARY KEY UNIQUE,
    Name VARCHAR(255),
    Email VARCHAR(255) UNIQUE,
    Password VARCHAR(255),
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
    ProductID BIGSERIAL PRIMARY KEY UNIQUE,
    ProductName VARCHAR(255),
    ProductCost INT,
    AccountID BIGSERIAL, -- Kolom untuk kunci asing
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID),
    PostedDate DATE,
    -- ProductIMG bytea, 
    Description VARCHAR(255),
    CatchDate DATE
);

-- Tabel "Shopping_Cart"
CREATE TABLE Shopping_Cart (
    ShoppingCartID BIGSERIAL PRIMARY KEY NOT NULL UNIQUE,
    Created DATE,
    AccountID BIGSERIAL, -- Kolom untuk kunci asing
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID)
);

-- Tabel "Reviews"
CREATE TABLE Reviews (
    ReviewID BIGSERIAL PRIMARY KEY,
    AccountID BIGSERIAL, -- Kolom untuk kunci asing
    ProductID BIGSERIAL, 
    FOREIGN KEY (ProductID) REFERENCES Product (ProductID),
    FOREIGN KEY (AccountID) REFERENCES Account (AccountID),
    ReviewContent VARCHAR(255),
    Rating INT
);

-- Tabel "Orders"
CREATE TABLE Orders (
    OrderID BIGSERIAL PRIMARY KEY NOT NULL UNIQUE,
    AccountID BIGSERIAL, -- Kolom untuk kunci asing
    ProductID BIGSERIAL,
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
    OrderID BIGSERIAL,
    FOREIGN KEY (OrderID) REFERENCES Orders (OrderID),
    Paid BOOLEAN,
    Total DECIMAL,
    Details payment_details_enum
);


                    --TESTER--

-- Isi tabel Account
INSERT INTO Account (AccountID, Name, Email, Password, Address, Phone, Role)
VALUES
    (1, 'John Doe', 'johndoe@example.com', 'password123', '123 Main St', 123456789, 'FisherMan'),
    (2, 'Alice Smith', 'alicesmith@example.com', 'password456', '456 Elm St', 987654321, 'Traders');

-- Isi tabel Product
INSERT INTO Product (ProductID, ProductName, ProductCost, AccountID, PostedDate, Description, CatchDate)
VALUES
    (1, 'Fish 1', 20, 1, '2023-10-26', 'Fresh catch of the day', '2023-10-25'),
    (2, 'Fish 2', 15, 1, '2023-10-26', 'Great for grilling', '2023-10-24'),
    (3, 'Fish 3', 30, 2, '2023-10-26', 'Premium quality', '2023-10-25');

-- Isi tabel Shopping_Cart
INSERT INTO Shopping_Cart (ShoppingCartID, Created, AccountID)
VALUES
    (1, '2023-10-26', 1),
    (2, '2023-10-25', 2);

-- Isi tabel Reviews
INSERT INTO Reviews (ReviewID, AccountID, ReviewContent, Rating)
VALUES
    (1, 1, 'Great product!', 5),
    (2, 2, 'Excellent service!', 4);

-- Isi tabel Orders
INSERT INTO Orders (OrderID, AccountID, ProductID, TotalAmount, OrderDate, DeliveryDate, DeliveryStatus)
VALUES
    (1, 1, 1, 20, '2023-10-26', '2023-10-27', 'Pending'),
    (2, 2, 3, 30, '2023-10-25', '2023-10-28', 'Shipped');

-- Isi tabel Payment
INSERT INTO Payment (PaymentID, OrderID, Paid, Total, Details)
VALUES
    (1, 1, true, 20, 'Credit Card'),
    (2, 2, true, 30, 'PayPal');



