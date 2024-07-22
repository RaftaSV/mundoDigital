drop database if exists MundoDigital;

create database MundoDigital;
use MundoDigital;
drop database if exists MundoDigital;

create database MundoDigital;
use MundoDigital;
CREATE TABLE users (
    userId INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    fullName VARCHAR(50) NOT NULL,
    address VARCHAR(100),
    email VARCHAR(40) NOT NULL UNIQUE,
    userPassword VARCHAR(255) NOT NULL,
    status INT NOT NULL
);

CREATE TABLE categories (
    categoryId INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    categoryName VARCHAR(20) NOT NULL,
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
