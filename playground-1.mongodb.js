

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

//listing and removing indexes
db.peaks.getIndexes()

db.peaks.dropIndex({"height":1})

db.cities.insertMany([
    {"name": "Seoul", "country": "South Korea", "continent": "Asia", "population": 25.674 },
    {"name": "Mumbai", "country": "India", "continent": "Asia", "population": 19.980 },
    {"name": "Lagos", "country": "Nigeria", "continent": "Africa", "population": 13.463 },
    {"name": "Beijing", "country": "China", "continent": "Asia", "population": 19.618 },
    {"name": "Shanghai", "country": "China", "continent": "Asia", "population": 25.582 },
    {"name": "Osaka", "country": "Japan", "continent": "Asia", "population": 19.281 },
    {"name": "Cairo", "country": "Egypt", "continent": "Africa", "population": 20.076 },
    {"name": "Tokyo", "country": "Japan", "continent": "Asia", "population": 37.400 },
    {"name": "Karachi", "country": "Pakistan", "continent": "Asia", "population": 15.400 },
    {"name": "Dhaka", "country": "Bangladesh", "continent": "Asia", "population": 19.578 },
    {"name": "Rio de Janeiro", "country": "Brazil", "continent": "South America", "population": 13.293 },
    {"name": "São Paulo", "country": "Brazil", "continent": "South America", "population": 21.650 },
    {"name": "Mexico City", "country": "Mexico", "continent": "North America", "population": 21.581 },
    {"name": "Delhi", "country": "India", "continent": "Asia", "population": 28.514 },
    {"name": "Buenos Aires", "country": "Argentina", "continent": "South America", "population": 14.967 },
    {"name": "Kolkata", "country": "India", "continent": "Asia", "population": 14.681 },
    {"name": "New York", "country": "United States", "continent": "North America", "population": 18.819 },
    {"name": "Manila", "country": "Philippines", "continent": "Asia", "population": 13.482 },
    {"name": "Chongqing", "country": "China", "continent": "Asia", "population": 14.838 },
    {"name": "Istanbul", "country": "Turkey", "continent": "Europe", "population": 14.751 }
])


//$match aggregation
db.cities.aggregate([
    {
        $match:{
            "continent":"Asia"
        }
    }
])

db.cities.find({"continent":"Asia"})

db.cities.aggregate([
    {
        $match:{
            "continent":{$in:['North America','Asia']}
        }
    }
])
db.cities.aggregate([
    {
        $match:{
            "country":{$in:['India','China']}
        }
    }
])

db.cities.find().sort({"population":-1})

//$match and $sort 
db.cities.aggregate([
    {
        $match:{
            "continent":"Asia"
        }
    },
    {
         $sort:{
            "population":-1
        }
    }
])

db.cities.aggregate([
    {
        $sort:{
            "country":-1
        }
    }
])

db.cities.aggregate(
    [
    {
    $match:{
"continent":"North America"
    }
},
{
    $sort:{
        "population":-1
    }
}
])

//$group
db.cities.aggregate([
    {
        $group:{
            "_id":"$continent"
        }
    }
])

//total population
db.cities.aggregate([
    {
        $group:{
            _id:"$continent",
            totalPopulation:{
                $sum:"$population"
            }
        }
    }
])

db.cities.aggregate([
    {
        $group:{
            _id:'$country',
            totalPopulation:{
                $sum:"$population"
            }
        }
    }
])

//Array Operators
db.getCollectionInfos()



db.peaks.updateOne({name:"Lhotse"},{$push:{location:"Singai"}})

db.peaks.find({name:"Lhotse"})

db.peaks.updateOne({name:"Lhotse"},{$pull:{location:"China"}})

db.peaks.updateOne({name:"Lhotse"},{$pull:{location:['China','Singai']}})

db.peaks.updateOne({name:"Lhotse"},{$pull:{location:"Singai"}})

db.peaks.updateOne({name:"Lhotse"},{$addToSet:{location:"Nepal"}})


//removes first elemet of an array
db.peaks.updateOne({name:"Lhotse"},{$pop:{location:-1}})

//removes last element of an array
db.peaks.updateOne({name:"Lhotse"},{$pop:{location:1}})

//rename
db.peaks.updateMany({},{$rename:{"location":"locations"}})

db.peaks.find()

//$set used to replace the value of a field or if field doesn't exists create a field with that specified value
db.peaks.updateMany({},{$set:{'Direction':'East'}})

db.peaks.updateMany({name:{$in:['Lhotse','K2']}},{$set:{'Direction':'West'}})

//upsert
db.peaks.updateOne({name:"Mount Everest"},{$set:{
    name:"Mt Everest",
    height:8700,
    ascent:{
        first:{
            year:2023
        }
    },
    locations:['Pakistan','Indonesia']
}},{upsert:true})

db.peaks.updateOne({name:'Mt Everest'},{$set:{height:6700}})
//$unset
db.peaks.updateOne({name:"Mt Everest"},{$unset:{height:""}})

db.peaks.find({name:'Mt Everest'})

//$inc
db.peaks.updateMany({},{$set:{"ascents.first":{year:{$inc:1}}}})

db.peaks.drop()

db.peaks.find();
db.peaks.updateOne({"ascents.first":{year:1953}},{$inc:{"acsents.first.year":1}})







































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
