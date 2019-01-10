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

connection.query("SELECT item_id, product_name, department_name, price FROM products" , function (err, result) {
    if (err) throw err;
    console.table(result);

inquirer
    .prompt([
        {
            type: "input",
            message: "Insert product ID here",
            name: "id"
        },

        {
            type: "input",
            message: "How many units?",
            name: "count"
        }
    ])
    .then(function(inquirerResponse) {
        var ID = inquirerResponse.id;
        var count = inquirerResponse.count;
        connection.query("SELECT * FROM products WHERE item_id=" + ID, function(err, result){
            if(err) throw err;
            if(result[0].stock_quantity < count)
            {
                console.log("Insufficient quantity!")
            }
            else
            {
                connection.query("UPDATE products SET stock_quantity=" + (result[0].stock_quantity - count) + " WHERE item_id =" + ID, function(err, res){
                    if(err) throw err;
                    console.log("Your total will be: " + count * result[0].price);
                });
            }
        });

    })

    
});            
       