-- Drop the tables if they exist
DROP TABLE IF EXISTS shoppingcart;
DROP TABLE IF EXISTS invoicesdetails;
DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS userstypes;

-- Create the userstypes table
CREATE TABLE userstypes (
    userTypeId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    userType VARCHAR(20),
    userTypeStatus INT NOT NULL
);

-- Create the users table with explicitly named foreign key
CREATE TABLE users (
    userId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    fullName VARCHAR(50) NOT NULL,
    address VARCHAR(100),
    email VARCHAR(40) NOT NULL UNIQUE,
    phoneNumber VARCHAR(9) NOT NULL,
    userPassword VARCHAR(255) NOT NULL,
    userTypeId INT NOT NULL,
    status INT NOT NULL,
    CONSTRAINT fk_users_usertypes FOREIGN KEY (userTypeId) REFERENCES userstypes(userTypeId)
);

-- Create the categories table
CREATE TABLE categories (
    categoryId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    categoryName VARCHAR(20) NOT NULL,
    urlImage VARCHAR(200),
    status INT NOT NULL
);

-- Create the products table with explicitly named foreign key
CREATE TABLE products (
    productId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    productName VARCHAR(50) NOT NULL,
    urlImage VARCHAR(200),
    model VARCHAR(50),
    categoryId INT,
    description TEXT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    cost DECIMAL(10, 2) NOT NULL,
    status INT NOT NULL,
    CONSTRAINT fk_products_categories FOREIGN KEY (categoryId) REFERENCES categories(categoryId)
);

-- Create the invoices table with explicitly named foreign key
CREATE TABLE invoices (
    invoiceId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    userId INT NOT NULL,
    branchId INT NOT NULL,
    invoiceDate DATE,
    invoiceTime TIME,
    totalAmount DECIMAL(10, 4),
    totalCash DECIMAL(10, 4),
    invoiceChange DECIMAL(10, 4),
    invoiceStatus INT,
    CONSTRAINT fk_invoices_users FOREIGN KEY (userId) REFERENCES users(userId),
    INDEX invoiceDateIndex (invoiceDate)
);

-- Create the invoicesdetails table with explicitly named foreign keys
CREATE TABLE invoicesdetails (
    invoiceDetailId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    invoiceId INT NOT NULL,
    productId INT NOT NULL,
    cant INT,
    unitPrice DECIMAL(10, 4),
    totalAmount DECIMAL(10, 4),
    unitCost DECIMAL(10, 4),
    invoiceDetailStatus INT,
    CONSTRAINT fk_invoicesdetails_invoices FOREIGN KEY (invoiceId) REFERENCES invoices(invoiceId),
    CONSTRAINT fk_invoicesdetails_products FOREIGN KEY (productId) REFERENCES products(productId),
    INDEX invoiceIdIndex (invoiceId)
);

-- Create the shoppingcart table with explicitly named foreign keys
CREATE TABLE shoppingcarts (
    cartId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    userId INT NOT NULL,
    productId INT NOT NULL,
    cartStatus INT,
    CONSTRAINT fk_shoppingcart_users FOREIGN KEY (userId) REFERENCES users(userId),
    CONSTRAINT fk_shoppingcart_products FOREIGN KEY (productId) REFERENCES products(productId)
);

-- Insert data into userstypes
INSERT INTO userstypes (userType, userTypeStatus) VALUES ('admin', 0);
INSERT INTO userstypes (userType, userTypeStatus) VALUES ('cliente', 0);

-- Insert data into users
INSERT INTO users (fullName, address, email, phoneNumber, userPassword, userTypeId, status) VALUES (
    'Rafael Antonio Gonzalez Protillo', 'Nueva Concepcion, Chalatenango', 'Gp0555032019@unab.edu.sv', '6311-4859', '$2b$10$Knh8iWZUvMwjZNJkjs/90.K52VXazLruae7G.CTl5Qg6sTcmGQEeu', 1, 0
);
