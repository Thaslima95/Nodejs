/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('EKART');

// db.createCollection('Products') //create a collection with name Products


//  db.getCollection('Products').insertOne([
//   { 'name': 'Asus', 'price': 10, 'quantity': 10, 'date': new Date() }
 
// ]);

// db.getCollection('Products').insertMany([
//   { 'name': 'Acer', 'price': 1003, 'quantity': 2, 'date': new Date() },
//   { 'name': 'Asus TUF', 'price': 2003, 'quantity': 5, 'date': new Date() },
//   { 'name': 'Dell', 'price': 400, 'quantity': 8, 'date': new Date() },
//   { 'name': 'Micromax', 'price': 333, 'quantity': 7, 'date': new Date() }
// ]);

//find command

// db.getCollection('Products').findOne({name:'Acer'})

// db.getCollection('Products').find({})

// db.getCollection('Products').find({quantity:{$gte:6}})


// db.getCollection('Products').find({}, { _id: 0, name: 1,quantity: 1 } )


// db.getCollection('Products').find().sort({'name':-1})


// db.getCollection('Products').deleteOne({name:'Dell'})


use('EKART')
db.Products.find({})

use('EKART')

// db.getCollection('Products').insertMany([
//   { 'name': 'Tuf Gaming', 'price': 1003, 'quantity': 2, 'date': new Date() },
//   { 'name': 'Tornoto', 'price': 2003, 'quantity': 5, 'date': new Date() },
//   { 'name': 'Inspiron', 'price': 400, 'quantity': 8, 'date': new Date() },
//   { 'name': 'Galaxy', 'price': 333, 'quantity': 7, 'date': new Date() }
// ]);

//delete many



db.Products.deleteMany({name:''})











































// Run a find command to view items sold on April 4th, 2014.
const salesOnApril4th = db.getCollection('sales').find({
  date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
}).count();

// Print a message to the output window.
console.log(`${salesOnApril4th} sales occurred in 2014.`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
db.getCollection('sales').aggregate([
  // Find all of the sales that occurred in 2014.
  { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
  // Group the total sales for each product.
  { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
]);
