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
  {
    $match:{
CommentSection:{$ne:[]}
    }
  },
  {
    $project:{
      title:1,
      _id:0,
       comments:{$mergeObjects:"$CommentSection"}
    }
  }
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
     $match:{
      CommentSection:{$ne:[]}
     }
  },
  {
    $project:{
      _id:0,
      title:1,
      "CommentSection.text":1,
      "CommentSection.name":1
    }
  }
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
     $match:{
      CommentSection:{$ne:[]}
     }
  },
  {
    $project:{
      _id:0,
      title:1,
      comments:{$mergeObjects:"$CommentSection"}
     
    }
  }
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

//$lookup with $project
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

//$unwind:
//unwind array

//based on array values document will be separated
db.inventory.insertOne({ "_id" : 1, "item" : "ABC1", sizes: [ "S", "M", "L"] })


db.inventory.aggregate([
  {
    $unwind:"$sizes"
  }
])

//unwind array with null values
db.clothing.insertMany([
  { "_id" : 1, "item" : "Shirt", "sizes": [ "S", "M", "L"] },
  { "_id" : 2, "item" : "Shorts", "sizes" : [ ] },
  { "_id" : 3, "item" : "Hat", "sizes": "M" },
  { "_id" : 4, "item" : "Gloves" },
  { "_id" : 5, "item" : "Scarf", "sizes" : null }
])


db.clothing.aggregate([
  {
    $unwind:"$sizes"
  }
])
//it will eliminate the records with empty array
//to get the records with empty array and null.
//set true to second field preserveNullAndEmptyArrays to true

db.clothing.aggregate([
  {
    $unwind:{
      path:"$sizes",
      preserveNullAndEmptyArrays:true
    }
  }
])

//Group by unwound values

db.inventory2.insertMany([
  { "_id" : 1, "item" : "ABC", price: NumberDecimal("80"), "sizes": [ "S", "M", "L"] },
  { "_id" : 2, "item" : "EFG", price: NumberDecimal("120"), "sizes" : [ ] },
  { "_id" : 3, "item" : "IJK", price: NumberDecimal("160"), "sizes": "M" },
  { "_id" : 4, "item" : "LMN" , price: NumberDecimal("10") },
  { "_id" : 5, "item" : "XYZ", price: NumberDecimal("5.75"), "sizes" : null }
])

//Group by unwound values
db.inventory2.aggregate([
  {
    $unwind:{
      path:"$sizes",
      preserveNullAndEmptyArrays:true
    }
  },
  {
    $group:{
      _id:"$sizes",
      avgPrice:{$avg:"$price"}
    }
  },
  {
    $sort:{
      avgPrice:-1
    }
  }
])

//Unwind Embedded Arrays

db.salesData.insertMany([
  {
    _id: "1",
    "items" : [
     {
      "name" : "pens",
      "tags" : [ "writing", "office", "school", "stationary" ],
      "price" : NumberDecimal("12.00"),
      "quantity" : NumberInt("5")
     },
     {
      "name" : "envelopes",
      "tags" : [ "stationary", "office" ],
      "price" : NumberDecimal("19.95"),
      "quantity" : NumberInt("8")
     }
    ]
  },
  {
    _id: "2",
    "items" : [
     {
      "name" : "laptop",
      "tags" : [ "office", "electronics" ],
      "price" : NumberDecimal("800.00"),
      "quantity" : NumberInt("1")
     },
     {
      "name" : "notepad",
      "tags" : [ "stationary", "school" ],
      "price" : NumberDecimal("14.95"),
      "quantity" : NumberInt("3")
     }
    ]
  }
])

db.salesData.find()
//Unwind Embedded Arrays

db.salesData.aggregate([
  //first satge unwind based on items 
  {
    $unwind:"$items"
  }
])

db.salesData.aggregate([
  {
    $unwind:"$items"
  },
  //second stage unwind based on each tags inside items
  {
    $unwind:"$items.tags"
  }
])


db.salesData.aggregate([
  {
    $unwind:"$items"
  },
  {
    $unwind:"$items.tags"
  },
  //third stage grouping by values of tags and calculated the total sale based on each tags
  {
    $group:{
      _id:"$items.tags",
      totalSale:{$sum:{$multiply:['$items.price','$items.quantity']}},
     "items":{
      "$firstN":{
        input:"$items.name",
        n:4
      }
     }
    }
  }
])

//$push:
//The $push operator appends a specified value to an array.
db.inventory3.insertMany([
  { "_id" : 1, "item" : "ABC", price: NumberDecimal("80"), "sizes": [ "S", "M", "L"] },
  { "_id" : 2, "item" : "EFG", price: NumberDecimal("120"), "sizes" : [ ] },
  { "_id" : 3, "item" : "IJK", price: NumberDecimal("160"), "sizes":[ "M"] },
  { "_id" : 4, "item" : "LMN" , price: NumberDecimal("10") },
  { "_id" : 6, "item" : "ABC", price: NumberDecimal("50"), "sizes": [ "S", "M"] },
 { "_id" : 7, "item" : "ABC", price: NumberDecimal("50"), "sizes": [ "M","L"] }
])

db.inventory3.drop()

db.inventory3.find()

//$push values in multiple documents
db.inventory3.updateMany({},{$push:{"sizes":"x"}})

db.inventory3.find()

//$push with $each modifier
db.inventory3.updateMany({"item":"ABC"},{$push:{"sizes":{$each:['xs','xl']}}})


db.students.drop()


db.students.insertOne(
   {
      "_id" : 5,
      "quizzes" : [
         { "wk": 1, "score" : 10 },
         { "wk": 2, "score" : 8 },
         { "wk": 3, "score" : 5 },
         { "wk": 4, "score" : 6 }
      ]
   }
)

db.students.find()

//Use $push Operator with Multiple Modifiers
db.students.updateOne(
  {
    _id:5
  },
  {
    $push:{
      quizzes:{
        $each:[{"wk":5,"score":12},{"wk":6,"score":14},{"wk":7,"score":16}],
        $sort:{score:1},
      }
    }
  }, 
)

//update with multiple modofiers with upsert true
db.students.updateOne({_id:6},{
  $push:{
    quizess:{
      $each:[{"wk":1,"score":3},{"wk":2,"score":7}],
      $sort:{score:1},
      $slice:4
    }
  }
},{
  upsert:true
})


//Aggregation pipeline step by step
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

//find vs match

db.cities.find({})

db.cities.aggregate([
  {
    $match:{}
  }
])

db.cities.find({"continent":"South America"})

db.cities.aggregate([
  {
    $match:{
      continent:"South America"
    }
  }
])

db.cities.find({continent:{$in:['South America','Asia']}})

db.cities.aggregate([
  {
    $match:{
      continent:{
        $in:['South America','Asia']
      }
    }
  }
])


db.cities.find().sort({continent:-1})

db.cities.aggregate([
  {
    $sort:{
      continent:-1
    }
  }
])

//$match and $sort
db.cities.aggregate([
  {
    $match:{
      continent:{
        $in:['South America','North America']
      }
    }
  },
  {
    $sort:{
      continent:-1
    }
  }
])

//$group

db.cities.aggregate([
  {
    $group:{
      _id:"$continent"
    }
  }
])


//multifields in group

db.cities.aggregate([
  {
    $group:{
      _id:{
        "continent":"$continent",
        "country":"$country"
      }
    }
  }
])

db.cities.aggregate([
  {
    $group:{
      _id:{
      "continent":"$continent",
      "country":"$country"
      },
      "firstCity":{$first:"$name"},
      "highestPopulation":{$max:"$population"}
    }
  }
])

db.cities.aggregate([
  {
        $match: {
            "continent": { $in: ["North America", "Asia"] }
        }
    },
    {
        $sort: { "population": -1 }
    },
  {
    $group:{
      _id:{
      "continent":"$continent",
      "country":"$country"
      },
      "highestPopulation":{$max:"$population"},
      "firstCity":{$first:"$name"},
      
    }
  }
])




db.students.find()



db.inventory3.find()


db.grades.drop()

//$map aggregation
db.grades.insertMany([
  { "_id" : 1, "name" : "dave123", Marks: [ 90, 80, 75, 84 ] },
{ "_id" : 2, "name" : "li", Marks: [ 100, 70, 65, 84 ]  },
{ "_id" : 3, "name" : "ahn", Marks: [ 89, 80, 75, 48 ] },
{ "_id" : 4, "name" : "ty", Marks: [ 59, 60, 75, 98 ]  },
])

db.grades.find()

//Each array value is increased by 2 using $map aggregation
db.grades.aggregate([
  {
    $project:{
      updatedMarks:{
        $map:{
          input:"$Marks",//denotes array name
          as:"mark",//denotes each array value
          in:{$add:["$$mark",2]//which operation to be performed in map aggregation

          }
        }
      }
    }
  }
])

db.grades.aggregate([
  {
    $project:{
      name:"$name",
      updatedMarks:{
        $map:{
          input:"$Marks",
          as:"mark",
          in:{$multiply:["$$mark",3]}
          
        }
      }
    }
  }
])


db.movies.find()

db.movies.find({title:"Hannah Montana & Miley Cyrus: Best of Both Worlds Concert"})

db.movies.createIndex({"imdb.rating":1})

db.movies.aggregate([
  {
    $match:{
      type:{$in:['movie','series']}
    }
  },
  {
    $sort:{
      "imdb.rating":1
    }
  },
  {
    $group:{
      _id:"$type",
      "title":{$first:"$title"},
      "minRating":{$min:"$imdb.rating"}
    }
  },


],{ "allowDiskUse" : true })

db.movies.aggregate([
  {
    $match:{
      type:{$in:['movie','series']}
    }
  },
  {
    $sort:{
      "imdb.rating":1
    }
  },
  {
    $group:{
      _id:"$type",
      "title":{
        "$firstN":{
          input:"$title",
          n:40
        }
      },
      "minRating":{$min:"$imdb.rating"}
    }
  },


],{ "allowDiskUse" : true })

db.movies.aggregate([
  {
    $match:{
      "imdb.rating":{$eq:3.9}
    }
  }
])

//$mergeObjects

db.usersInfo.insertMany([
  {
	"_id" : 1,
	"name" : {
		"first_name" : "Aafiya",
		"last_name" : "Thasnim"
	},
	"contact" : {
		"email" : "aafiya@ample.com",
		"ph" : null
	}
}
])

db.usersInfo.find()

//$mergeObjects
//merge the two objects into (name & contact)
db.usersInfo.aggregate([
  {
    $project:{
      usersInfo:{
        $mergeObjects:["$name","$contact"]
      }
    }
  }
])


//Duplicate values

db.usersInfo.insertMany([
  {
	"_id" : 2,
	"name" : {
		"first_name" : "Aafiya",
		"last_name" : "Thasnim"
	},
	"contact" : {
		"email" : "aafiya@ample.com",
		"first_name":"Nizamudeen"
	}
}
])

//$mergeObjects with duplicate values
db.usersInfo.aggregate([
  {
      $match:{_id:2}
  },
  {
    $project:{
      usersInfo:{
        $mergeObjects:["$name","$contact"]
      }
    }
  }
])

//Null values
db.usersInfo.insertMany([
  {
	"_id" : 3,
	"name" : {
		"first_name" : "Aafiya",
		"last_name" : "Thasnim"
	},
	"contact" : null
}
])

db.usersInfo.insertMany([
  { "_id" : 4, "name" : null, "contact" : null }
])


db.usersInfo.aggregate([
  {
    $match:{_id:{$in:[3,4]}}
  },
  {
    $project:{

      usersInfo:{
        $mergeObjects:["$name","$contact"]
      }
    }
  }
])




db.products.insertMany([
  {
	"_id" : 1,
	"product" : "Shirt",
	"inventory" : {
		"blue" : 10,
		"red" : 2
	}
},
{
	"_id" : 2,
	"product" : "Shirt",
	"inventory" : {
		"green" : 3,
		"black" : 1
	}
},
{
	"_id" : 3,
	"product" : "Shorts",
	"inventory" : {
		"blue" : 2,
		"red" : 8
	}
},
{
	"_id" : 4,
	"product" : "Shorts",
	"inventory" : {
		"green" : 5,
		"black" : 3
	}
}
])


db.products.aggregate([
  {
    $group:{_id:"$product",
      mergedObject:{$mergeObjects:"$inventory"}
  }
  }
])


db.test.insertMany([
  {
	"_id" : 1,
	"data" : [
		{
			"a" : 1,
			"b" : 2
		},
		{
			"c" : 3,
			"d" : 4
		}
	]
}
])

//merging array of objects
db.test.aggregate([
  {
    $project:{
      resultData:{$mergeObjects:"$data"}
    }
  }
])



//Missing Fields

db.usersInfo.aggregate([
  {
    $project:{
      usersInfo:{$mergeObjects:["$name","$address"]}
      //we dont have address object in usersInfo collection
    }
  }
])



db.usersInfo.deleteOne({_id:3})


db.usersInfo.find()














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
