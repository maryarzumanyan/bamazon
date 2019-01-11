CREATE database bamazon;
USE bamazon;
CREATE TABLE products(
item_id INTEGER auto_increment primary key,
product_name VARCHAR(50),
department_name VARCHAR(50),
price FLOAT,
stock_quantity INTEGER
);

INSERT INTO products
	(product_name, department_name, price, stock_quantity)
VALUES
	("Kindle", "Devices", 129.99, 15 ),
    ("Alexa", "Devices", 149.99, 110 ),
    ("Ring Video Doorbell", "Devices", 99.99, 4),
    ("Bar Stools", "Home", 67.99, 8),
    ("Watter Bottle", "Home", 22.01, 3),
    ("Sink Faucet", "Home", 440.90, 6),
    ("Walkie Talkies", "Sports & Outdoors", 58.99, 35),
    ("Hiking boot", "Sports & Outdoors", 58.99, 35),
    ("Coconut Milk", "Fresh", 2.99, 120),
    ("Baby Spinach", "Fresh", 1.99, 50);
    