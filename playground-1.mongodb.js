

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



db.Products.deleteMany({quantity:5})

 db.Products.find({})

// db.Products.updateOne({name:"Acer"},{$set:{quantity:12}})

// db.Products.updateOne({name:"Tuf Gaming"},{$set:{quantity:11}})

// //upsert insert the document if not found
// db.Products.updateOne({name:"Dell Inspiron"},{
//   $set:{
//     name:"Dell Inspiron",
//     price:1006,
//     quantity:18,
//     date:Date()
//   }
// },
// {upsert:true})


db.Products.updateMany({},{$inc:{quantity:5}})

db.peaks.insertMany([
    {
        "name": "Everest",
        "height": 8848,
        "location": ["Nepal", "China"],
        "ascents": {
            "first": {
                "year": 1953
            },
            "first_winter": {
                "year": 1980
            },
            "total": 5656
        }
    },
    {
        "name": "K2",
        "height": 8611,
        "location": ["Pakistan", "China"],
        "ascents": {
            "first": {
                "year": 1954
            },
            "first_winter": {
                "year": 1921
            },
            "total": 306
        }
    },
    {
        "name": "Kangchenjunga",
        "height": 8586,
        "location": ["Nepal", "India"],
        "ascents": {
            "first": {
                "year": 1955
            },
            "first_winter": {
                "year": 1986
            },
            "total": 283
        }
    },
    {
        "name": "Lhotse",
        "height": 8516,
        "location": ["Nepal", "China"],
        "ascents": {
            "first": {
                "year": 1956
            },
            "first_winter": {
                "year": 1988
            },
            "total": 461
        }
    },
    {
        "name": "Makalu",
        "height": 8485,
        "location": ["China", "Nepal"],
        "ascents": {
            "first": {
                "year": 1955
            },
            "first_winter": {
                "year": 2009
            },
            "total": 361
        }
    }
])


db.peaks.find({name:"Makalu"})

//not equal
db.peaks.find({name:{$ne:"Makalu"}})

db.peaks.find({name:{$ne:"Everest"}})

//in operator
db.peaks.find({name:{$in:['Makalu','Everest']}})

db.peaks.find({location:{$in:['Pakistan','India']}})

db.peaks.find({location:{$ne:['Pakistan','China']}})

//implicit and operator
db.peaks.find(
    { "name": "Everest", "height": 8848 }
)


//explicit and operator
db.peaks.find({$and:[{"name":"Lhotse"},{"height":8516}]})




//or operator
db.peaks.find({$or:[{"name":"Everest"},{location:{$in:['Pakistan','India']}}]})

db.peaks.find(
    { "location": { $all: ["China", "Nepal"] } }
)

//nested documents
db.peaks.find({"ascents.total":5656})

db.peaks.find({"ascents.first.year":1955})

db.peaks.find({$or:[{"ascents.total":283},{"ascents.first.year":1953}]})

db.peaks.find({"ascents.total":{$lte:400}})

db.peaks.find().count()

//limit and desc sort
db.peaks.find().limit(2).sort({name:-1})

db.peaks.find(
    {},
    { "_id": 0, "name": 1, "height": 1 }
).limit(3).sort({ "height": 1 })

db.peaks.find(
    { "height": { $gt: 8700 } }
).explain("executionStats")


//creating index to search efficiently
//his key accepts either 1 or -1 as a value. These values denote the index’s sorting order, with 1 indicating ascending order and -1 indicating descending

db.peaks.createIndex( { "height": 1 } )

db.peaks.find(
    { "height": { $gt: 8700 } }
).explain("executionStats")

//creating index with uniquenss
db.peaks.createIndex( { "name": 1 }, { "unique": true } )

db.peaks.find(
    { "name": "Everest" }
).explain("executionStats")

db.peaks.insertOne({
    "name": "MakaluTest",
    "height": 9200,
    "location": ["India"],
    "ascents": {
        "first": {
            "year": 2020
        },
        "first_winter": {
            "year": 2021
        },
        "total": 2
    }
})

//creating index for nested documents
db.peaks.createIndex({"ascents.total":1})

db.peaks.find({"ascents.total":{$gte:400}}).sort({"ascents.total":-1}).explain("executionStats")





































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
