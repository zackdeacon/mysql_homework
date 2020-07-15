DROP DATABASE IF EXISTS employeesDB;
CREATE database employeesDB;

USE employeesDB;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(100) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department (id),
  PRIMARY KEY (id)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT ,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES role (id),
  manager_id INT,
  -- FOREIGN KEY (manager_id) REFERENCES manager (id),
  PRIMARY KEY (id)
);


-- Department Seeds --


INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Operations");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Human Resources");


-- role Seeds --


-- engineering
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Developer", 120000.59, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Developer", 90000.42, 3);

-- Sales
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Sales Manager", 100000.20, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Exec", 80000.09, 1);

-- Operations
INSERT INTO role (title, salary, department_id)
VALUES ("Director of Operations", 120000.72, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Assistant Director of Operations", 80000.80, 2);

-- Human Resources
INSERT INTO role (title, salary, department_id)
VALUES ("HR Manager", 100000.87, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("HR Lead", 70000.10, 4);


-- employees Seeds --


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Pollock", 3, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Zachary", "Deacon", 1, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Ron", "Swanson", 6, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Leslie", "Knope", 8, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Andy", "Dwier", 7, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Chris", "Traeger", 5, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Anne", "Perkins", 4, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Ben", "Wyatt", 2, NULL);