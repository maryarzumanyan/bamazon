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
    choices: ["View Product Sales by Department", "Create New Department"],
    name: "options"
  }
])
.then(function(inquirerResponse) {
    if(inquirerResponse.options === "View Product Sales by Department")
    {
        connection.query("SELECT department_id, products.department_name, over_head_costs, SUM(product_sales) as product_sales, (SUM(product_sales) - over_head_costs) as total_profit \
        FROM bamazon.products \
        INNER JOIN bamazon.departments ON products.department_name = departments.department_name \
        GROUP BY products.department_name" , function (err, result) { 
            if (err) throw err;
            console.table(result);
        });
    }
    else
    {
        inquirer
            .prompt([
            {
                type: "input",
                message: "Insert Department name",
                name: "newDep"
            },

            {
                type: "input",
                message: "Over head costs",
                name: "costs"
            }
        ])
        .then(function(inquirerResponse) {
            connection.query("INSERT INTO departments(department_name, over_head_costs) VALUES ('" + inquirerResponse.newDep + "' ," + inquirerResponse.costs + ")", function(err, res){
                if(err) throw err;
            });
        })

    }
    
})