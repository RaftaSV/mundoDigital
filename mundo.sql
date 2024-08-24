drop database if exists MundoDigital;

create database MundoDigital;
use MundoDigital;

create table UsersTypes (
userTypeId int auto_increment primary key not null,
userType varchar(20),
userTypeStatus int not null
);

CREATE TABLE users (
    userId INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    fullName VARCHAR(50) NOT NULL,
    address VARCHAR(100),
    email VARCHAR(40) NOT NULL UNIQUE,
    phoneNumber varchar(9) not null,
    userPassword VARCHAR(255) NOT NULL,
    userTypeId int not null,
	status INT NOT NULL,
    foreign key (userTypeId) references UsersTypes(userTypeId)
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
    cost DECIMAL(10, 2) NOT NULL,
    status INT NOT NULL,
    FOREIGN KEY (categoryId) REFERENCES categories(categoryId)
);



insert into usersTypes (userType, userTypeStatus) values ('admin',0);
insert into usersTypes (userType, userTypeStatus) values ('cliente',0);
insert into users (fullname, address, email,phoneNumber, userPassword, userTypeId, status) values (
'Rafael Antonio Gonzalez Protillo', 'Nueva Concepcion, Chalatenango', 'Gp0555032019@unab.edu.sv', '6311-4859','$2b$10$Knh8iWZUvMwjZNJkjs/90.K52VXazLruae7G.CTl5Qg6sTcmGQEeu', 1,0
);
