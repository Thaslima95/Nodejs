const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/mydb";
console.log("inside")

MongoClient.connect(url, function(err, db) {
    
    console.log(err , "error")
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
