-- Create the database
CREATE DATABASE beauty_inventory_db;
USE beauty_inventory_db;

-- Create table for products
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    merk VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Insert sample data into products
INSERT INTO products (product_name, merk, category, quantity, price) VALUES
('Hydrating Lipstick', 'Maybelline', 'Lipstick', 50, 15.00),
('Matte Foundation', 'Fenty Beauty', 'Foundation', 30, 35.00),
('Blush On Peach', 'NARS', 'Blush', 20, 25.00),
('Eyeliner Waterproof', 'L\'Oréal', 'Eyeliner', 40, 12.00),
('Moisturizing Cream', 'Cetaphil', 'Skincare', 15, 20.00);