const mysql=require('mysql');
const env=require('dotenv');

env.config();
const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:process.env.MYSQL_DATABASE_PASSWORD,
    database:"Ecart"
})

con.connect(function(err){
    if (err) throw err;
    console.log("Connected to database successfully")
}) 

// const sql="CREATE TABLE CustomerInfo (Customer_Id INT AUTO_INCREMENT PRIMARY KEY,Customer_Name VARCHAR(255),City VARCHAR(255),Country VARCHAR(255))";
// con.query(sql,function(err,resut){
//     if(err) throw err;
//     console.log("Table created")
// })

// const sql="INSERT INTO CustomerInfo (Customer_Name,City,Country) VALUES ?"
// const values=[
//     ['Alfreds','Berlin','Germany'],
//     ['Ana','Avda','México'],
//     ['Antonio','Mataderos','Mexico'],
//     ['Aroundey','Hanover','UK'],
//     ['Berglunds','Berguvsvagen','Sweden'],
//     ['Blondel','Strasbourg','France'],
//     ['Bon','Marseille','France']
// ]
// con.query(sql,[values],function(err,result){
//     if(err) throw err;
//     console.log(`Number of rows Inserted ${result.affectedRows}`)
// })

// const sql="SELECT * FROM CustomerInfo"
// con.query(sql,function(err,result){
//     if(err) throw err;
//     console.log(result);
// })

// const sql="INSERT INTO CustomerInfo  (Customer_Name,City) VALUES ?"
// const values=[
//     ['Moreno','Mexico D.F.'],
//     ['Futterkiste','Frankfurt']
// ]
// con.query(sql,[values],function(err,result){
//     if(err) throw err;
//     console.log(`Rows Inserted ${result.affectedRows}`)
// })

//Getting coulmn having values null

// const sql="SELECT * FROM CustomerInfo WHERE Country IS NULL"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log(result);
// })

//Not Null

// const sql="SELECT * FROM CustomerInfo WHERE Country IS NOT NULL"
// con.query(sql,function(err,result){
//     if(err) throw err;
//     console.log(result)
// })

//Update

// const sql="UPDATE CustomerInfo SET Country='UK' WHERE Customer_Id=8"
// con.query(sql,function(err,result){
//     if(err) throw err;
//     console.log(`Number of rows affected ${result.affectedRows}`)
// })

// const sql="UPDATE CustomerInfo SET Country='London' WHERE Country IS NULL"
// con.query(sql,function(err,result){
//     if(err) throw err;
//     console.log(`No of rows updated ${result.affectedRows}`)
// })

// const sql="INSERT INTO CustomerInfo (Customer_Name,City,Country) VALUES ?"
// const values=[
//     ['snabbkop','Berlin','UK'],
//     ['sinchanp','alfred','UK'],
//         ['sinchapnag','Tornoto','UK']
// ]
// con.query(sql,[values],function(err,result){
//     if(err) throw err;
//     console.log(`No of rows Inserted ${result.affectedRows}`)
// })

//Delete 

// const sql="DELETE FROM CustomerInfo WHERE Country='Sweden'"
// con.query(sql,function(err,result){
//     if(err) throw err;
//     console.log(`No of rows affected ${result.affectedRows}`)
//     console.log(result)
// })


//LIMIT 

// const sql="SELECT * FROM CustomerInfo LIMIT 5"
// con.query(sql,function(err,result){
//     if(err) throw err;
//     console.log(result)
// })

//LIMIT WITH WHERE CLAUSE

// const sql="SELECT * FROM CustomerInfo WHERE Country='UK' LIMIT 3"
// con.query(sql,function(err,result){
//     if(err) throw err;
//     console.log(result)
// })

//DROP Table
// const sql="DROP TABLE  IF EXISTS products"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log("Table deleted")
// })


//create product table
// const sql="CREATE TABLE products (Product_Id INT AUTO_INCREMENT PRIMARY KEY,Product_Name VARCHAR(255),PRICE INT(10) NOT NULL)"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log("Product Table created")
// })

//Alter field name
// const sql="ALTER TABLE products RENAME COLUMN PRICE TO Price";
// con.query(sql,function(err,result){
//     if(err) throw err;
//     console.log("Column altered")
// })


//Insert values into product table
// const sql="INSERT INTO products (Product_Name,Price) VALUES ?"
// const values=[
//     ['Chais','18'],
//     ['Chang','19'],
//     ['Aniseed Syrup','10'],
//     ['Ikura','31'],
//     ['Queso Cabrales','21'],
//     ['Konbu','23'],
//     ['Pavlova','17'],
//     ['Carnarvon','62']
// ]
// con.query(sql,[values],function(err,result){
//     if(err) throw err;
//     console.log(`No of records inserted ${result.affectedRows}`)
// })

//MIN and MAX
// const sql="SELECT MIN(Price) As LOWEST FROM products"
// con.query(sql,function(err,result){
//     if(err) throw err;
//     console.log(result)
// })

// const sql="SELECT MAX(Price) As HIGHEST FROM products"
// con.query(sql,function(err,result){
//     if(err) throw err;
//     console.log(result)
// })

//COUNT,AVG AND SUM
// const sql="SELECT COUNT(Product_Name) FROM products"
// con.query(sql,function(err,result){
//     if(err) throw err;
//     console.log(result)
// })

// const sql="SELECT AVG(Price) FROM products"
// con.query(sql,function(err,result){
// if(err) throw err;
// console.log(result)
// })

// const sql="SELECT SUM(Price) As TotalSUM FROM products"
// con.query(sql,function(err,result){
//     if(err) throw err;
//     console.log(result);
// })

//Wildcard characters
// const sql="SELECT * FROM CustomerInfo WHERE Customer_Name LIKE 'b%'"
// con.query(sql,function(err,result){
//     if(err) throw err;
//     console.log(result)
// })

// const sql="SELECT * FROM CustomerInfo WHERE Customer_Name LIKE '%n'"
// con.query(sql,function(err,result){
//     if(err) throw err;
//     console.log(result)
// })

// const sql="SELECT * FROM CustomerInfo WHERE Customer_Name LIKE '_u%'"
// con.query(sql,function(err,result){
//     if(err) throw err;
//     console.log(result)
// })

// const sql="SELECT * FROM CustomerInfo WHERE Customer_Name LIKE '%b___'"
// con.query(sql,function(err,result){
//     if(err) throw err;
//     console.log(result)
// })


// const sql="SELECT * FROM CustomerInfo WHERE Customer_Name LIKE '%b_%_%'"
// con.query(sql,function(err,result){
//     if(err) throw err;
//     console.log(result)
// })

// const sql="SELECT * FROM CustomerInfo WHERE Country IN ('Germany','UK')"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log(result);
// })


// const sql="SELECT * FROM CustomerInfo WHERE Country NOT IN ('Germany','Mexico')"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log(result)
// })

//BETWEEN
// const sql="SELECT * FROM products WHERE Price BETWEEN 20 AND 40"
// con.query(sql,function(err,result){
//     if(err) throw err;
//     console.log(result)
// })


//NOT BETWEEN
// const sql="SELECT * FROM products WHERE Price NOT BETWEEN 30 AND 40"
// con.query(sql,function(err,result){
//     if(err) throw err;
//     console.log(result)
// })

//BETWEEN TEXT VALUES
// const sql="SELECT * FROM CustomerInfo WHERE Country BETWEEN 'France' AND 'London' ORDER BY Country "
// con.query(sql,function(err,result){
//     if(err) throw err;
//     console.log(result)
// })

// const sql="SELECT Customer_Name,Country FROM CustomerInfo WHERE Country BETWEEN 'London' AND 'UK'"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log(result)
// })

// const sql="SELECT Customer_Name,City,Country FROM CustomerInfo WHERE Country NOT BETWEEN 'London' AND 'UK'"
// con.query(sql,function(err,result){
//     if(err) throw err;
//     console.log(result)
// })

// const sql="SELECT Customer_Id AS ID , Customer_Name As Name FROM CustomerInfo"
// con.query(sql,function(err,result){
//     if(err) throw err;
//     console.log(result)
// })

//Concat_ws
// const sql="SELECT Customer_Id AS ID, Customer_Name AS Name , CONCAT_WS(',',City,Country) AS Address FROM CustomerInfo"
// con.query(sql,function(err,result){
//     if(err) throw err;
//     console.log(result)
// })

//Create Order Table
// const sql="CREATE TABLE orders (Order_id INT AUTO_INCREMENT PRIMARY KEY,CustomerId INT,FOREIGN KEY (CustomerId) REFERENCES CustomerInfo(Customer_Id))"
// con.query(sql,function(err,result){
//     if(err) throw err;
//     console.log("Order Table created")
// })

//order id starts with 1000
// const sql="ALTER TABLE orders AUTO_INCREMENT=1000"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log("Table Altered")
// })

//add one more colum
// const sql="ALTER TABLE orders ADD COLUMN Order_date DATE AFTER CustomerId"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log("Table Altered")
// })

//Insert Values into orders table
// const sql="INSERT INTO orders (CustomerId,Order_date) VALUES ?"
// const values=[
//     ['2','2023-03-04'],
//     ['7','2023-03-14'],
//     ['3','2023-03-02'],
//     ['8','2023-04-04'],
//     ['1','2023-03-1'],
//     ['9','2023-02-04'],
//     ['2','2023-05-04']

// ]

// con.query(sql,[values],function(err,result)
// {
//     if(err) throw err;
//     console.log(`No of rows affected ${result.affectedRows}`)
// })


//JOINS
// const sql="SELECT c.Customer_Name,c.City,c.Country,o.Order_id,o.CustomerId,o.Order_date FROM CustomerInfo as c JOIN orders as o ON c.Customer_Id=o.CustomerId"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log(result)
// })


//Left join
// const sql="SELECT c.Customer_Name,o.Order_Id,c.Customer_Id,o.Order_date FROM CustomerInfo AS c LEFT JOIN orders as o ON c.Customer_Id=o.CustomerId"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log(result)
// })

// const sql="INSERT INTO orders (CustomerId,Order_date) VALUES ?"
// const values=[
//     ['6','2023-01-20'],
//     ['8','2022-02-10'],
//     ['4','2023-03-08'],
//     ['3','2023-05-05']
// ]

// con.query(sql,[values],function(err,result){
//     if(err) throw err;
//     console.log(result)
// })

// const sql="UPDATE orders SET CustomerId='5' WHERE Order_Id=1007"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log(result.affectedRows)
// })

// const sql="CREATE TABLE Employees (EmpId INT AUTO_INCREMENT PRIMARY KEY,LastName VARCHAR(255),FirstName VARCHAR(255))"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log(result)
// })




// const sql="INSERT INTO Employees (LastName,FirstName) VALUES ?"
// const values=[
//     ['Davolio','Nancy'],
//     ['Fuller','Andrew'],
//     ['Leverling','Janet'],
//     ['Peacock','Margaret'],
//     ['Suyama','Michael']
// ]
// con.query(sql,[values],function(err,result)
// {
// if(err) throw err;
// console.log(`No of rows affected ${result.affectedRows}`)
// })

// const sql="ALTER TABLE orders ADD COLUMN EmployeeID INT "
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log("Altered Table")
// })


// const sql="UPDATE  orders SET EmployeeId='2' WHERE Order_Id='1005'"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log(`No of rows affected ${result.affectedRows}`)
// })

// const sql="DELETE FROM orders WHERE CustomerId IS NULL"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log(`No of Rows affected ${result.affectedRows}`)
// })

//RIGHT JOIN
// const sql="SELECT o.Order_Id,e.LastName,e.FirstName FROM orders as o RIGHT JOIN Employees as e ON o.EmployeeID=e.EmpId ORDER BY o.Order_Id"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log(result)
// })

//Produce same result as INNER JOIN

// const sql="SELECT c.Customer_Name,o.Order_Id FROM CustomerInfo as c CROSS JOIN orders as o WHERE c.Customer_Id=o.CustomerId"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log(result)
// })

//create supplier table
// const sql="CREATE TABLE Suppliers (Supplier_ID INT AUTO_INCREMENT PRIMARY KEY,Supplier_Name VARCHAR(255),City VARCHAR(255),Country VARCHAR(255))"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log("Supplier Table Created")
// })

// const sql="INSERT INTO Suppliers (Supplier_Name,City,Country) VALUES ?"
// const values=[
//     ['Exotic Liquid','Berlin','Germany'],
//     ['Tokyo Traders','Hanover','UK'],
//     ["Mayumi's",'Marseilli','France'],
//     ['Pavlova Liquid','Frankfurt','London'],
//     ['Specialty Biscuits','alfred','UK'],

// ]
// con.query(sql,[values],function(err,result)
// {
//     if(err) throw err;
//     console.log(`Rows Inserted ${result.affectedRows}`)
// })

//UNION
// const sql="SELECT City FROM CustomerInfo UNION SELECT City FROM Suppliers"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log(result)
// })

//UNION ALL
// const sql="SELECT City FROM CustomerInfo UNION ALL SELECT City FROM Suppliers"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log(result)
// })

//Practicing questions from website
// const sql="CREATE TABLE countries (country_id INT AUTO_INCREMENT PRIMARY KEY,country_name VARCHAR(255),region_id INT )";
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log("countries tables created")
// })

// const sql="CREATE TABLE IF NOT EXISTS countries (country_id INT AUTO_INCREMENT PRIMARY KEY,country_name VARCHAR(255),region_id INT )"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log("table created")
// })

// const sql="CREATE TABLE IF NOT EXISTS dup_countries (country_id INT AUTO_INCREMENT PRIMARY KEY,country_name VARCHAR(255),region_id decimal(10,2))"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log("Duplicate table created")
// })

//create duplicate copy of countries including structure and data
// const sql="CREATE TABLE IF NOT EXISTS dup_name AS SELECT * FROM countries"
// con.query(sql,function(err,result){
//     if(err) throw err;
//     console.log("table created")
// })

// const sql="CREATE TABLE IF NOT EXISTS duplicate_countries (country_id INT AUTO_INCREMENT PRIMARY KEY,country_name VARCHAR(255) NOT NULL,region_id decimal(10,2) NOT NULL)"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log("Table created")
// })

//Create a table countries, and make sure that no countries except Italy, India and China will be entered in the table
// const sql="CREATE TABLE IF NOT EXISTS countries (country_id INT AUTO_INCREMENT PRIMARY KEY,country_name VARCHAR(255) CHECK (country_name IN ('ITALY','INDIA','CHINA')),region_id decimal(10,2))"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log("Table created")
// })

//INSERT 
// const sql="INSERT INTO countries (country_name,region_id) VALUES ?"
// const values=[
//     ['India','1001'],
//     ['Italy','1002'],
//     ['China','1004']
// ]
// con.query(sql,[values],function(err,result)
// {
//     if(err) throw err;
//     console.log(`Inserted Rows ${result.affectedRows}`)
// })

//create a table with duplicate sturcture and entries of countires
// const sql="CREATE TABLE IF NOT EXISTS countrys_new AS SELECT * FROM countries"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log(result)
// })

// / Insert one row in jobs table to ensure that no duplicate value will be entered in the job_id column
// const sql="CREATE TABLE IF NOT EXISTS jobs (Job_id INT NOT NULL,Job_title VARCHAR(255) NOT NULL,MIN_SALARY decimal(6,0))"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log("Table created")
// })

// const sql="INSERT INTO jobs (Job_id,Job_title,MIN_SALARY) VALUES (1001,'Developer',100.00)"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log(`Inserted Rows ${result.affectedRows}`)
// })

//DEFAULT
// const sql="CREATE TABLE IF NOT EXISTS countries (country_id INT AUTO_INCREMENT PRIMARY KEY,country_name VARCHAR(255) DEFAULT 'N/A')"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log("Table created")
// })

//Foreign key constraint
// const sql="CREATE TABLE IF NOT EXISTS job_hsitory (job_id INT NOT NULL UNIQUE PRIMARY KEY,job_title VARCHAR(255) NOT NULL DEFAULT ' ' ,Min_salary decimal(10,0))"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log("Table Created")
// })

//DROP TABLE
// const sql="DROP TABLE  IF EXISTS job_history"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log("Table deleted")
// })

//creating job_history table with foreign key constraint
// const sql="CREATE TABLE IF NOT EXISTS job_history (job_id INT NOT NULL PRIMARY KEY,job_title VARCHAR(255),min_slary decimal(10,0),FOREIGN KEY (job_id) REFERENCES jobs(Job_id)) "
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log("Table created")
// })


//ALTER TABLE 
// const sql="ALTER TABLE jobs MODIFY COLUMN Job_id INT NOT NULL PRIMARY KEY"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log("Table Altered")
// })

//ALTER TABLE
// const sql="ALTER TABLE job_history ADD COLUMN Employee_id INT NOT NULL UNIQUE "
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log("altered table")
// })

// const sql="CREATE TABLE IF NOT EXISTS Departments (Department_Id INT NOT NULL UNIQUE,Department_name VARCHAR(255),Manager_Id INT NOT NULL,Location_Id INT DEFAULT NULL,PRIMARY KEY (Department_Id,Manager_Id))"
// con.query(sql,function(err,result)
// {
//     if(err) throw err;
//     console.log("Table created")
// })





