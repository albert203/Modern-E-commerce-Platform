-- Executes this file through docker compose on build command
USE anime_store;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL, 
  password VARCHAR(255) NOT NULL
);

INSERT INTO users (firstname, lastname, email, password) 
VALUES ('john', 'doe', 'johndoe@gmail.com', 'JohnDoe123456!');