require("dotenv").config();
var keys = require("./keys.js");
var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: keys.sql.psd,
    database: "bamazon"
})

connection.connect(function(err){
    if (err) throw err;    
})

inquirer
.prompt([
  {
    type: "list",
    message: "Select action",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
    name: "options"
  }
])
.then(function(inquirerResponse) {
    if(inquirerResponse.options === "View Products for Sale")
    {
        connection.query("SELECT * FROM products" , function (err, result) {
            if (err) throw err;
            console.table(result);
        });
    }
    else if(inquirerResponse.options === "View Low Inventory") 
    {
        connection.query("SELECT * FROM products WHERE stock_quantity < 5"  , function (err, result) {
            if (err) throw err;
            console.table(result);
        });
    }
    else if(inquirerResponse.options === "Add to Inventory") 
    {
        inquirer
            .prompt([
            {
                type: "input",
                message: "Insert product ID here",
                name: "id"
            },

            {
                type: "input",
                message: "How many units to add?",
                name: "count"
            }
        ])
        .then(function(inquirerResponse) {
            var ID = inquirerResponse.id;
            var count = inquirerResponse.count;

            connection.query("UPDATE products SET stock_quantity = stock_quantity +" + count + " WHERE item_id =" + ID, function(err, res){
                if(err) throw err;
            });
        })

    }
    else
    {
        inquirer
            .prompt([
            {
                type: "input",
                message: "Insert product name",
                name: "name"
            },
            {
                type: "input",
                message: "Insert product department",
                name: "department"
            },
            {
                type: "input",
                message: "Insert price",
                name: "price"
            },
            {
                type: "input",
                message: "Insert stock quantity ",
                name: "count"
            }
        ])
        .then(function(inquirerResponse) {

            connection.query("INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('" + inquirerResponse.name + "' , '" + inquirerResponse.department + "', " + inquirerResponse.price + ", " + inquirerResponse.count + ")", function(err, res){
                if(err) throw err;
            });
        })

    }
})