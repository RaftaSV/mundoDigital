drop database if exists MundoDigital;

create database MundoDigital;
use MundoDigital;

-- Create the TypeUsers table
CREATE TABLE typeUsers (
    typeId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_type VARCHAR(50) NOT NULL,
	status INT NOT NULL,
);

-- Create the Categories table
CREATE TABLE Categories (
    categoryId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
	status INT NOT NULL
);

-- Create the Products table
CREATE TABLE Products (
    productId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    product_description TEXT,
    price DECIMAL(10,4),
    category_id INT NOT NULL,
    status INT NOT NULL,
	FOREIGN KEY (category_Id) REFERENCES Categories(categoryId)
);

-- Create the Users table
CREATE TABLE Users (
    userId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    type_Id INT NOT NULL,
	status INT NOT NULL,
    FOREIGN KEY (type_Id) REFERENCES typeUsers(typeId)
);

-- Create the Invoices table
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

-- Create the Invoices_Details table
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
