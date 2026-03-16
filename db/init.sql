CREATE DATABASE IF NOT EXISTS contacts;
USE contacts;

CREATE TABLE IF NOT EXISTS contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50),
    message TEXT
);
