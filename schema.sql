DROP DATABASE IF EXISTS employeesDB;
CREATE database employeesDB;

USE employeesDB;

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT ,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(100) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);


-- employees Seeds --

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Pollock", NULL, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Zachary", "Deacon", NULL, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Ron", "Swanson", NULL, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Leslie", "Knope", NULL, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Andy", "Dwier", NULL, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Chris", "Traeger", NULL, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Anne", "Perkins", NULL, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Ben", "Wyatt", NULL, NULL);

-- role Seeds --

-- engineering
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Developer", 120000.59, NULL);

INSERT INTO role (title, salary, department_id)
VALUES ("Developer", 90000.42, NULL);

-- Sales
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Sales Manager", 100000.20, NULL);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Exec", 80000.09, NULL);

-- Operations
INSERT INTO role (title, salary, department_id)
VALUES ("Director of Operations", 120000.72, NULL);

INSERT INTO role (title, salary, department_id)
VALUES ("Assistant Director of Operations", 80000.80, NULL);

-- Human Resources
INSERT INTO role (title, salary, department_id)
VALUES ("HR Manager", 100000.87, NULL);

INSERT INTO role (title, salary, department_id)
VALUES ("HR Lead", 70000.10, NULL);

-- Department Seeds --

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Operations");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Human Resources");



-- Queries --

SELECT * FROM top_songsDB.top5000; --Select all 
SELECT * FROM top_songsDB.top5000 WHERE artist = "Eminem"; -- Search by artist
SELECT * FROM top_songsDB.top5000 WHERE song = "Hey Ya!"; -- Search by song title 
SELECT * FROM top_songsDB.top5000 WHERE year BETWEEN 1980 & 1985 ; 
SELECT artist, COUNT(*) 
FROM top_songsDB.top5000 
GROUP BY artist 
HAVING COUNT(*) >= 2;
