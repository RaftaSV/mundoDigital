drop database if exists MundoDigital;

create database MundoDigital;
use MundoDigital;

CREATE TABLE Users (
    userId INT PRIMARY KEY AUTO_INCREMENT not null,
    fullName VARCHAR(50) NOT NULL,
    address VARCHAR(100),
    email VARCHAR(40) NOT NULL UNIQUE,
    userPassword VARCHAR(255) NOT NULL,
	status integer not null
);

CREATE TABLE Categories (
    categoryId INT PRIMARY KEY AUTO_INCREMENT not null,
    categoryName VARCHAR(20) NOT NULL,
    urlImage VARCHAR(200),
	status integer not null
);

CREATE TABLE Products (
    productId INT PRIMARY KEY AUTO_INCREMENT Not null,
    productName VARCHAR(50) NOT NULL,
	urlImage VARCHAR(200),
    model VARCHAR(50),
    categoryId INT,
    description TEXT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    status integer not null,
    FOREIGN KEY (categoryId) REFERENCES Categories(categoryId)
);
