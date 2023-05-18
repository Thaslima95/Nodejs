const mysql = require('mysql');
const env=require('dotenv');

env.config();//store secret variables in env files.
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_DATABASE_PASSWORD,
  database:"Ecart"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
//   const sql = "CREATE TABLE products (name VARCHAR(255), quantity INT(10))";  
// con.query(sql, function (err, result) {  
// if (err) throw err;  
// console.log("Table created");  
// });  
// var sql = "INSERT INTO products (name, quantity) VALUES ('Asus', '5')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 rows affected/inserted");
//   });
// const sql = "INSERT INTO products (name, quantity) VALUES ?";
//   const values = [
//     ['DELL', '7'],
//     ['HP','10'],
//     ['acer','5'],
//     ['Moto','8']
//   ];
//   con.query(sql, [values], function (err, result) {
//     if (err) throw err;
//     console.log("Number of records inserted/affected: " + result.affectedRows);
//   });
});
// const sql = "INSERT INTO products (name, quantity) VALUES ?";
//   const values = [
//     ['Nokia', '7'],
//     ['Microsoft','10'],
//     ['Apple','5'],
//     ['Oppo','8']
//   ];
//   con.query(sql, [values], function (err, result) {
//     if (err) throw err;
//     console.log("Number of records inserted/affected: " + result.affectedRows);
//   });

  // const sql = "INSERT INTO products (name, quantity) VALUES ('Iball', '11')";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("1 record inserted, ID is : " + result.insertId);
  // });

//  con.query("SELECT * FROM products WHERE name = 'Nokia'", function (err, result) {
//     if (err) throw err;
//     console.log(result);
//   });
// con.query("SELECT * FROM products WHERE name LIKE '%o%'", function (err, result) {
//     if (err) throw err;
//     console.log(result);
//   });

//Escaping query to prevent sql injection
//we can use mysql.escape() or ? in query.
// const val = 'HP';
// const sql = 'SELECT * FROM products WHERE name = ' + mysql.escape(val);
// con.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log(result);
// });
// const name = 'Microsoft';
// const quan = '5';
// const sql = 'SELECT * FROM products WHERE name = ? OR quantity = ?';
// con.query(sql, [name, quan], function (err, result) {
//   if (err) throw err;
//   console.log(result);
// });

// const sql="SELECT * FROM products ORDER BY name DESC";

// con.query(sql,function(err,result)
// {
//   if(err) throw err;
//   console.log(result)
// });

// const sql="DELETE FROM products WHERE name='Iball'";
// con.query(sql,function(err,result){
//   if(err) throw err;
//   console.log(result)//Used template string
// })
// const sql = "INSERT INTO products (name, quantity) VALUES ('Htc', '20')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//    console.log(result);
//    });

// //Drop table command i am not going to executed now
//   const sql = "DROP TABLE products";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table deleted");
//   });

  //   const sql = "DROP TABLE IF EXISTS products";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Table deleted");
  // });
  // const  sql = "UPDATE products SET quantity = '20' WHERE name = 'HP'";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log(result.affectedRows + " record(s) updated");
  // });
  //  const sql = "SELECT * FROM products LIMIT 3";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log(result);
  // });

//     const sql = "CREATE TABLE customers (name VARCHAR(255), product_purchased VARCHAR(255))";  
// con.query(sql, function (err, result) {  
// if (err) throw err;  
// console.log("Table created");  
// }); 

// const sql = "INSERT INTO customers (name, product_purchased) VALUES ?";
//   const values = [
//     ['Johny', 'DELL'],
//     ['Bebefin','Microsoft'],
//     ['Massha','Oppo'],
//     ['Bob','Nokia']
//   ];
//   con.query(sql, [values], function (err, result) {
//     if (err) throw err;
//     console.log("Number of records inserted/affected: " + result.affectedRows);
//   });

// const sql = "SELECT customers.name AS customer, products.name AS product FROM products INNER JOIN customers ON products.name=customers.product_purchased";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log(result);
//   });


//used template string to achieve multiline statements
const sql=`SELECT products.name AS product,
customers.name AS customer
FROM products
LEFT JOIN customers ON products.name = customers.product_purchased`
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });

