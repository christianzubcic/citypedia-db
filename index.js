var express = require('express');
var mongodb = require('mongodb');

var url = "mongodb://localhost:27017/citypedia";

const mongoClient = mongodb.MongoClient;
const app = express();
let db // Datenbank handle


console.log("Creating database...");
//Connection zur Datenbank
mongoClient.connect(url, function(err, connection) {
  if (err) {
    console.log("Oooops something went wrong with the db connection.");
    console.log("Make sure the mongo docker is running!");
    throw err;
  } else {
    db = connection;
    var collection = db.collection('city'); // create Collection
    console.log("Database created!");
  }
});



//endpoint cities
app.get("/api/cities", (req,res) => {
  res.send(result);

  res.status(200).end();
});

app.listen(3000, function (){console.log("Listening on Port 3000!")});
