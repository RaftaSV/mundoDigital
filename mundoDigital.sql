drop database if exists MundoDigital;

create database MundoDigital;
use MundoDigital;
drop database if exists MundoDigital;

create database MundoDigital;
use MundoDigital;

CREATE TABLE typeUsers (
    typeId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_type VARCHAR(50) NOT NULL,
    status INT NOT NULL,
);

CREATE TABLE users (
    userId INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    fullName VARCHAR(50) NOT NULL,
    address VARCHAR(100),
    email VARCHAR(40) NOT NULL UNIQUE,
    userPassword VARCHAR(255) NOT NULL,
    status INT NOT NULL,
    type_Id INT NOT NULL,
    FOREIGN KEY (type_Id) REFERENCES typeUsers(typeId)
);

CREATE TABLE categories (
    categoryId INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    categoryName VARCHAR(40) NOT NULL,
    urlImage VARCHAR(200),
    status INT NOT NULL
);

CREATE TABLE products (
    productId INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    productName VARCHAR(50) NOT NULL,
    urlImage VARCHAR(200),
    model VARCHAR(50),
    categoryId INT,
    description TEXT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    status INT NOT NULL,
    FOREIGN KEY (categoryId) REFERENCES categories(categoryId)
);

CREATE TABLE Invoices (
    invoice_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    invoice_date DATE,
    invoice_time TIME,
    total_amount DECIMAL(10,4),
    total_cash DECIMAL(10,4),
    invoice_change DECIMAL(10,4),
    invoice_status INT,
    status INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(userId),
    INDEX invoice_date_index (invoice_date)
);

CREATE TABLE Invoices_Details (
    invoice_detail_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    invoice_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT,
    unit_price DECIMAL(10,4),
    total_amount DECIMAL(10,4),
    unit_cost DECIMAL(10,4),
    invoice_detail_status INT,
    status INT NOT NULL,
    FOREIGN KEY (invoice_id) REFERENCES Invoices(invoice_id),
    FOREIGN KEY (product_id) REFERENCES Products(productId)
);
