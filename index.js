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
                    console.log("Goodbye!");
                    connection.end();
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
    ]).then(function(answers){
        connection.query(
            "INSERT INTO department SET ?",
            {
              name: answers.departmentName
            },
            function(err, res) {
              if (err) throw err;
              console.log("Set has been insterted!");
            }
          );
          begin()
        })
        
    }

    function addRole() {
        var query = connection.query(
            "SELECT * FROM department",
            
            function(err, department) {
              if (err) throw err;             
        inquirer.prompt([{
            type: "input",
            message: "What is the title of the role that you would like to add?",
            name: "roleTitle"
        },
        {
            type: "input",
            message: "What is the annual salary for the role that you would like to add?",
            name: "roleSalary"
        },
        {
            type: "list",
            message:"Which department does this role belong to?",
            choices: () => {
                const departmentArr = [];
                for (var i = 0; i < department.length; i++) {
                    departmentArr.push(department[i].name);
                }
                return [...departmentArr]
            },
            name: "empRole"
        }
    ]).then(function(answers){
        let departmentID;
        for (let i = 0; i < department.length; i++) {
            if(department[i].name === answers.empRole){
                departmentID=department[i].id;
            }
        }
           connection.query(
            "INSERT INTO role SET ?",
            {
              title: answers.roleTitle,
              salary: answers.roleSalary,
              department_id: departmentID
            },
            function(err, res) {
              if (err) throw err;
              console.log("Set has been insterted!");
            }
          );
          begin()
    })
})
    }

    function addEmployee() {
                 var query = connection.query(
                "SELECT * FROM role",
                
                function(err, roles) {
                  if (err) throw err;             
                    

        inquirer.prompt([{
            type: "input",
            message: "What is the first name of the employee that you would like to add?",
            name: "empFName"
        },
        {
            type: "input",
            message: "What is the last name of the employee that you would like to add?",
            name: "empLName"
        },
        {
            type: "list",
            message:"What is this employees role?",
            choices: () => {
                const rolesArr = [];
                for (var i = 0; i < roles.length; i++) {
                    rolesArr.push(roles[i].title);
                }
                return [...rolesArr]
            },
            name: "empRole"
        }
        
    ]).then(function(answers){
        let role;
        for (let i = 0; i < roles.length; i++) {
            if(roles[i].title === answers.empRole){
                role=roles[i].id;
            }
        }
           connection.query(
            "INSERT INTO employees SET ?",
            {
              first_name: answers.empFName,
              last_name: answers.empLName,
              role_id: role
            },
            function(err, res) {
              if (err) throw err;
              console.log("Set has been insterted!");
            }
          );
          begin()
    })         
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
            var query = connection.query(
                "SELECT * FROM employees",
            
                function(err, employees) {
                if (err) throw err; 
            var query = connection.query(
                "SELECT * FROM role",
                    
                function(err, roles) {
                    if (err) throw err; 

            inquirer.prompt([{
                type: "list",
                message:"Which employee would you like to update?",
                choices: () => {
                    const employeesArr = [];
                    for (var i = 0; i < employees.length; i++) {
                        employeesArr.push(employees[i].first_name + " " + employees[i].last_name);
                    }
                    return employeesArr
                },
                name: "empName"
            },
            {
                type: "list",
                message:`Which role would you like to give them?`,
                choices: () => {
                    const rolesArr = [];
                    for (var i = 0; i < roles.length; i++) {
                        rolesArr.push(roles[i].title);
                    }
                    return rolesArr
                },
                name: "empRole"
            }
        ]).then(function(answers){
            let Role;
            for (var i = 0; i < roles.length; i++) {
                if (roles[i].title === answers.empRole) {
                    Role = roles[i].id;
                }
            }
            var empID;
            for (var i = 0; i < employees.length; i++) {
                if ((employees[i].first_name + " " + employees[i].last_name) === answers.empName) {
                    empID = employees[i].id;
                }
            }
            connection.query("UPDATE employees SET ? WHERE ?", [{ role_id: Role }, { id: empID}], function (err) {
                if (err) throw err
            })
            begin();
        })
         
        })
     })         
    }

