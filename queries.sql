-- Active: 1704598947293@@127.0.0.1@3306@anime_store
-- Queries to create the database and the users table

CREATE DATABASE IF NOT EXISTS anime_store;

CREATE USER 'albert'@'localhost' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON anime_store.* TO 'albert'@'localhost';

USE anime_store;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(50) UNIQUE NOT NULL,
  lastname VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO users (firstname, lastname, email, password) 
VALUES ('john', 'doe', 'johndoe@gmail.com', '123456');

select * from users;


