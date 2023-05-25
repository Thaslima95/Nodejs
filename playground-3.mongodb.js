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
use('mongodbVSCodePlaygroundDB');


db.movies.find()

db.theaters.find()

db.sessions.find()

db.getCollectionInfos()

db.users.find()

db.comments.find()

db.comments.find({"movie_id":ObjectId("573a1390f29313caabcd4323")})


db.movies.find({"_id":ObjectId("573a1390f29313caabcd4323")})

//lookup
db.movies.aggregate([
  {
    $lookup:{
      from:"comments",
      localField:"_id",
      foreignField:"movie_id",
      "pipeline":[
        {
        "$project":{"name":1,
        "text":1,
        "_id":0
        }
        }
      ],
      as:"CommentSection"
    }
  },
])

db.movies.aggregate([
  {
    $lookup:{
      from:"comments",
      localField:"_id",
      foreignField:"movie_id",
      as:"CommentSection"
    }
  },
  {
    $project:{
      "_id":0,
      title:1,
      "CommentSection.text":1,
      "CommentSection.name":1,
      
    },
   
    
  },
 {
   $count:"CommentSection"
  },
  // {
  //   $match: {
  //     "CommentSection": {
  //       "$gt": 1
  //     }
  //   }
  // }
])



db.comments.aggregate([
  {
    $lookup:{
      from:"movies",
      localField:"movie_id",
      foreignField:"_id",
      as:"CommentSection"
    }
  },
 {
  $unwind:{
    path:"$CommentSection"
  }
 }
  
])

db.comments.aggregate([
  {
    $lookup:{
      from:"movies",
      localField:"movie_id",
      foreignField:"_id",
      as:"CommentSection"
    }
  },
  {
    $project:{
      "_id":0,
      "CommentSection.title":1,
      text:1,
      name:1
    },
   
    
  },
  {
    $limit:3
  }
])

db.movies.aggregate([
    {
        $group:{
            _id:"$type"  ,
            minrating:{$min:"$imdb.rating"},
            "title":{"$first":"$title"}
            
        },      
    } 
  
])

db.movies.aggregate([
  {
    $group:{
      _id:"$type",
      "minrating":{$min:"$imdb.rating"},
      "title":{
        "$firstN":{
          input:"$title",
          n:3
        }
      }
    }
  }
])



db.comments.find()


db.comments.aggregate([
  {
    $match:{"_id":ObjectId("5a9427648b0beebeb69579e7")}
  },{
    $lookup:{
      from:"movies",
      localField:"movie_id",
      foreignField:'_id',
      as:"CommentSection"
    }
  },
  {
    $project:{
      _id:0,
      name:1,
      text:1,
      "CommentSection.title":1
    }
  }
])

db.comments.find({},{text:1,_id:0})

//$unwind Deconstructs an array field from the input documents to 
//output a document for each element.
// Each output document is the input document with the value of the array field replaced by the element.


db.movies.aggregate([
  {
    $lookup:{
      from:"comments",
      localField:"_id",
      foreignField:'movie_id',
      as:"CommentSection"
    }
  },
  {
$unwind:"$CommentSection"
  },
  {
      $replaceRoot: { newRoot: { $mergeObjects: [ "$CommentSection", "$$ROOT" ] } }
   },
  {
    $project:{
      _id:0,
     title:1,
      text:1,
      name:1
    }
  }
])


db.orders.insertMany( [
   { "_id" : 1, "item" : "almonds", "price" : 12, "quantity" : 2 },
   { "_id" : 2, "item" : "pecans", "price" : 20, "quantity" : 1 }
] )

db.items.insertMany( [
  { "_id" : 1, "item" : "almonds", description: "almond clusters", "instock" : 120 },
  { "_id" : 2, "item" : "bread", description: "raisin and nut bread", "instock" : 80 },
  { "_id" : 3, "item" : "pecans", description: "candied pecans", "instock" : 60 }
] )

db.orders.aggregate([
  {
    $lookup:{
      from:"items",
      localField:"item",
      foreignField:"item",
      as:"ItemSection"
    }
  },
  {
      $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$ItemSection", 0 ] }, "$$ROOT" ] } }
   },
   { $project: { ItemSection: 0,
  instock:0 } }
])

db.ordersnew.insertMany( [
  { "_id" : 1, "item" : "almonds", "price" : 12, "ordered" : 2 },
  { "_id" : 2, "item" : "pecans", "price" : 20, "ordered" : 1 },
  { "_id" : 3, "item" : "cookies", "price" : 10, "ordered" : 60 }
] )


db.warehouses.insertMany( [
  { "_id" : 1, "stock_item" : "almonds", warehouse: "A", "instock" : 120 },
  { "_id" : 2, "stock_item" : "pecans", warehouse: "A", "instock" : 80 },
  { "_id" : 3, "stock_item" : "almonds", warehouse: "B", "instock" : 60 },
  { "_id" : 4, "stock_item" : "cookies", warehouse: "B", "instock" : 40 },
  { "_id" : 5, "stock_item" : "cookies", warehouse: "A", "instock" : 80 }
] )



db.ordersnew.aggregate([
  {
    $lookup:{
      from:"warehouses",
      let:{'order_item':'$item','order_quantity':'$ordered'},
      pipeline:[
        {
          $match:{
            $expr:{
              $and:[
                {$eq:['$stock_item','$$order_item']},
                {$gte:['instock','$$order_quantity']}
              ]
            }
          }
        }
      ],
      as:"StockList"
    }
  },
  {
    $unwind:"$StockList"
  },{
    $replaceRoot:{newRoot:{$mergeObjects:['$StockList','$$ROOT']}
  }
},{
  $project:{
    StockList:0,
    stock_item:0,
  }
}
])



db.movies.find({title:"The Forsyte Saga"})
db.movies.aggregate([
  {
    $match:{
      "imdb.rating":{$eq:3.9}
    }
  }
])











// Insert a few documents into the sales collection.
db.getCollection('sales').insertMany([
  { 'item': 'abc', 'price': 10, 'quantity': 2, 'date': new Date('2014-03-01T08:00:00Z') },
  { 'item': 'jkl', 'price': 20, 'quantity': 1, 'date': new Date('2014-03-01T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 10, 'date': new Date('2014-03-15T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 20, 'date': new Date('2014-04-04T11:21:39.736Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 10, 'date': new Date('2014-04-04T21:23:13.331Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 5, 'date': new Date('2015-06-04T05:08:13Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 10, 'date': new Date('2015-09-10T08:43:00Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 5, 'date': new Date('2016-02-06T20:20:13Z') },
]);

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
