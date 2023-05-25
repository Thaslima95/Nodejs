

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



//lookup
db.posts.insertMany([{
    "title" : "my first post",
    "author" : "Jim",
    "likes" : 5
},
{
    "title" : "my second post",
    "author" : "Jim",
    "likes" : 2
},
{
    "title" : "hello world",
    "author" : "Joe",
    "likes" : 3
},
{
    "title" : "have a nice day",
    "author" : "Johny",
    "likes" : 7

}])


db.comments.insertMany([
    {
    "postTitle" : "my first post",
    "comment" : "great read",
    "likes" : 3
},
 {
    "postTitle" : "my first post",
    "comment" : "Nice shared",
    "likes" : 5
},
{
    "postTitle" : "my second post",
    "comment" : "good info",
    "likes" : 0
},
{
    "postTitle" : "my second post",
    "comment" : "i liked this post",
    "likes" : 12
},
{
    "postTitle" : "hello world",
    "comment" : "not my favorite",
    "likes" : 8
},
{
    "postTitle" : "my last post",
    "comment" : null,
    "likes" : 0
}
])

db.posts.aggregate([
    {
        $lookup:{
            from:"comments",
            localField:"title",
            foreignField:"postTitle",
            as:"Feeds",
            pipeline:[
                {
                    $project:{
            "title":1,
            "comment":1,
            "_id":0
        }
                }
            ]
        }
        
    }
  
    
])
db.posts.find().pretty()

//$and
db.peaks.find()

db.peaks.find({$and:[{"name":"Everest"},{"ascents.first.year":1953}]})

//$or
db.peaks.find({$or:[{"name":"Makalu"},{"ascents.total":{$in:[283,461]}}]})

//$and and $or together
db.peaks.find({$and:[{"location":"India"},{$or:[{"ascents.first_winter.year":{$gt:2000}},{"height":{$lt:8600}}]}]})


//$nor:
//return documents both query fails to match
db.peaks.find({$nor:[{"name":"Everest"},{"height":8586}]})


//$not:
//return documents where the query doesn't match
db.peaks.find({"height":{$not:{$gt:8500}}})



//update only updates the first document that matches the condition
db.posts.update({"author":"Jim"},{$inc:{likes:2}})
db.posts.find()
//update with multi
//with multi true updates all the document that matches the conditiond
db.posts.update({"author":"Jim"},{$inc:{likes:1}},{multi:true})

//findoneandUpdate()
db.posts.findOneAndUpdate({_id:ObjectId("646d8b7491255b9bf473f671")},{$set:{"title":"New Post","author":"Chikku"}})


db.posts.insertMany([{"title":"Test post","author":"bebefin","likes":3},{"title":"Walking Walking","author":"bebefin","likes":5}])

db.posts.find()

//remove()
db.posts.remove({"author":"bebefin"})

//remove only one
db.posts.remove({"author":"bebefin"},1)//doubt

//similiar to truncate
db.posts.remove({})//remove all the document from collection

db.posts.find()
//Limit 
db.posts.find({}).limit(2)

//limit and skip
db.posts.find({}).limit(2).skip(2)//skip it will skip the first 2 documents in collection and display next documents present in collection.


//creating multiple index
db.posts.createIndex({"author":1,"likes":-1})

//dopping multiple indexex
db.posts.dropIndexes({"author":1,"likes":-1})

//show indexe
db.posts.getIndexes()

//aggregation
db.posts.aggregate([
    {$group:{
        _id:"$author",
        num_ofPost:{
        $sum:1
    }
    }

}
])

db.comments.aggregate([
    {
        $group:{
            _id:"$postTitle",
            numofComments:{
                $sum:1
            }
        }
    }
])

db.posts.find()

db.posts.updateOne({"author":"Johny"},{$set:{likes:1}})
db.posts.aggregate([
    {
        $group:{
            _id:"$title",
            maxlikes:{
                $max:"$likes"
            }
        }
    }
])

db.sales.find()


//above code to mysql  select by_user, count(*) from mycol group by by_user.



db.orders.insertMany( [
   { _id: 0, name: "Pepperoni", size: "small", price: 19,
     quantity: 10, date: ISODate( "2021-03-13T08:14:30Z" ) },
     
   { _id: 1, name: "Pepperoni", size: "medium", price: 20,
     quantity: 20, date : ISODate( "2021-03-13T09:13:24Z" ) },
   { _id: 2, name: "Pepperoni", size: "large", price: 21,
     quantity: 30, date : ISODate( "2021-03-17T09:22:12Z" ) },
   { _id: 3, name: "Cheese", size: "small", price: 12,
     quantity: 15, date : ISODate( "2021-03-13T11:21:39.736Z" ) },
   { _id: 4, name: "Cheese", size: "medium", price: 13,
     quantity:50, date : ISODate( "2022-01-12T21:23:13.331Z" ) },
   { _id: 5, name: "Cheese", size: "large", price: 14,
     quantity: 10, date : ISODate( "2022-01-12T05:08:13Z" ) },
   { _id: 6, name: "Vegan", size: "small", price: 17,
     quantity: 10, date : ISODate( "2021-01-13T05:08:13Z" ) },
   { _id: 7, name: "Vegan", size: "medium", price: 18,
     quantity: 10, date : ISODate( "2021-01-13T05:10:13Z" ) },
     { _id: 8, name: "Pepperoni", size: "small", price: 19,
     quantity: 14, date: ISODate( "2021-03-13T08:14:30Z" ) }
] )

db.orders.find({name:"Cheese"})

db.orders.aggregate([
    {$match:{"name":"Pepperoni","size":"medium"}}
])

db.orders.aggregate([
    {$match:{"name":"Cheese"}},
    {
        $project:
    {
        name:1,
        size:1,
        _id:0
    }}
])

db.orders.aggregate([
    {
        $match:{
            size:"medium"
        },
        
    },
    {
        $group:{
            _id:"$name",
            "totalorderquanity":{$sum:"$quantity"}
        }
    }
])

db.orders.aggregate([
    {
        $match:{"size":"small"}
    },
    {
        $group:{
            _id:"$name",
            "totalorder":{$sum:"$quantity"},
            totalPrice:{$sum:"$price"}
        }
    }

])

db.orders.aggregate([
    {
        $match:{
            size:"medium"
        }
    },
    {
        $group:{
            _id:"$name",
            "totaorderquanity":{$sum:"$quantity"}
        }
    },
    {
        $sort:{
            totaorderquanity:-1
        }
    },
    {
        $limit:2
    },
    {
        $skip:1
    }
])

db.orders.aggregate([
    {
        $match:{
            "date":{$gte:new ISODate('2021-03-17'),$lt:new ISODate('2022-02-19')}
        }
    },
    {
        $group:{
            _id:"$size",
            count:{$sum:1}
        }
    }
])

db.orders.aggregate([
    {
        $match:{
            "date":{$gt:new ISODate('2021-03-11'),$lt:new ISODate('2022-02-19')}
        }
    },
    {
        $group:{
            _id:"$size",
            "name":{"$first":"$name"}

        }
    }
])

db.orders.aggregate([
    {
        $match:{
            "date":{$gt:new ISODate('2021-03-14'),$lt:new ISODate('2022-02-19')}
        }
    },
     {
        $group:{
            _id:"$size",
            "name":{"$first":"$name"}
        }
    }
   
])
db.orders.aggregate([
    {
        $match:{
            "date":{$gt:new ISODate('2021-03-14'),$lt:new ISODate('2022-02-19')}
        }
    },
    {
         $group:{
            _id:"$size",
            "name":{
                "$firstN":{
                    input:"$name",
                    n:3
                }
            }
        }
    }
])


db.orders.aggregate([
    {
        $match:{
           "date":{$gte:new ISODate('2021-01-10'),$lt:new ISODate('2022-03-19')}
        },

    },
    {
        $group:{
            _id:{$dateToString:{format:'%d-%m-%Y',date:"$date"}},
            totalOrderValue:{$sum:{$multiply:['$price','$quantity']}}
        }
    }
])

db.articles.insertMany([
    { "_id" : ObjectId("512bc95fe835e68f199c8686"), "author" : "dave", "score" : 80, "views" : 100 },
{ "_id" : ObjectId("512bc962e835e68f199c8687"), "author" : "dave", "score" : 85, "views" : 521 },
{ "_id" : ObjectId("55f5a192d4bede9ac365b257"), "author" : "ahn", "score" : 60, "views" : 1000 },
{ "_id" : ObjectId("55f5a192d4bede9ac365b258"), "author" : "li", "score" : 55, "views" : 5000 },
{ "_id" : ObjectId("55f5a1d3d4bede9ac365b259"), "author" : "annT", "score" : 60, "views" : 50 },
{ "_id" : ObjectId("55f5a1d3d4bede9ac365b25a"), "author" : "li", "score" : 94, "views" : 999 },
{ "_id" : ObjectId("55f5a1d3d4bede9ac365b25b"), "author" : "ty", "score" : 95, "views" : 1000 }
])


//no of records matches the given condition
db.articles.aggregate([
    {
        $match:{
            $or:[{"score":{$gt:70,$lt:90}},{"views":{$gte:1000}}]
        }
    },
    {
        $group:{
            _id:null,
            count:{$sum:1}
        }
    }
])

//Converting ObjectId to String




db.orders.drop()


























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
