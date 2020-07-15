var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "employeesDB"
  });
  
  connection.connect(function(err) {
      if (err) throw err;
      console.log("connected as id " + connection.threadId);
      begin();
    });

    function begin() {
        inquirer.prompt([{
            
            type: "list",
            message: "What would you like to do?",
            choices: ["add department", "add role", "add employee", "view department", "view role", "view employee", "update employee role", "quit"],
            name: "initial"
        }]).then(function({ initial }){
            switch (initial) {
                case "add department":
                    addDepartment();
                    break;
                case "add role":
                    addRole();
                    break;
                case "add employee":
                    addEmployee();
                    break;
                case "view department":
                    viewDepartment();
                    break;
                case "view role":
                    viewRole();
                    break;
                case "view employee":
                    viewEmployee();
                    break;
                case "update employee role":
                    UpdateEmployeeRole();
                    break;
                case "quit":
                    quit();
                    break;
            }
        })
    }

    function addDepartment() {

    }

    function addRole() {

    }

    function addEmployee() {

    }

    function viewDepartment() {

    }

    function viewRole() {

    }

    function viewEmployee() {

    }

    function UpdateEmployeeRole() {

    }

    function quit() {
        console.log("Goodbye!");
        connection.end
    }