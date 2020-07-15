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
        inquirer.prompt([{
            type: "input",
            message: "What is the name of the department that you would like to add?",
            name: "departmentName"
        }
    ]).then(function({ departmentName }){
            console.log(departmentName);
            //need to add the new department to mysql
        })
    }

    function addRole() {
        inquirer.prompt([{
            type: "input",
            message: "What is the title of the role that you would like to add?",
            name: "roleTitle"
        },
        {
            type: "input",
            message: "What is the annual salary for the role that you would like to add?",
            name: "roleSalary"
        }
    ]).then(function({ roleTitle, roleSalary }){
        console.log(roleTitle);
        console.log(roleSalary);
        //need to add the new role to mysql

    })
    }

    function addEmployee() {
        inquirer.prompt([{
            type: "input",
            message: "What is the first name of the employee that you would like to add?",
            name: "empFName"
        },
        {
            type: "input",
            message: "What is the last name of the employee that you would like to add?",
            name: "empLName"
        }
    ]).then(function({ empFName, empLName }){
        console.log(empFName);
        console.log(empLName);
    })

    }

    function viewDepartment() {
        var query = connection.query(
            "SELECT * FROM employeesDB.department",
            function(err, res) {
              if (err) throw err;
              console.table(res);
              begin();
            }
          );

    }

    function viewRole() {
        var query = connection.query(
            "SELECT * FROM employeesDB.role",
            function(err, res) {
              if (err) throw err;
              console.table(res);
              begin();
            }
          );

    }

    function viewEmployee() {
        var query = connection.query(
            "SELECT * FROM employeesDB.employees",
            function(err, res) {
              if (err) throw err;
              console.table(res);
              begin();
            }
          );

    }

    function UpdateEmployeeRole() {

    }

    function quit() {
        console.log("Goodbye!");
        connection.end
    }