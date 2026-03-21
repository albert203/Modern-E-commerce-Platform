-- Executes this file through docker compose on build command
USE anime_store;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL, 
  password VARCHAR(255) NOT NULL
);

-- INSERT INTO users (firstname, lastname, email, password) 
-- VALUES ('john', 'doe', 'johndoe@gmail.com', 'JohnDoe123456!');

-- addition stuff for products and cart

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    image VARCHAR(255),
    variant VARCHAR(100),
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add a few test products
INSERT INTO products (name, price, original_price, image, stock) VALUES
('Linen Shirt', 89.00, NULL, '/images/products/linen-shirt.jpg', 10),
('Wool Coat', 272.00, 340.00, '/images/products/wool-coat.jpg', 5),
('Silk Scarf', 65.00, NULL, '/images/products/silk-scarf.jpg', 20);