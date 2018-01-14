var express = require('express');
const bodyParser= require('body-parser');
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
    console.log("Database created!");
  }
});

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());


//
// GET
//

app.get("/api/cities", (req,res) => {
  //werte aus db lesen
  var werte = ["kek"];
  res.send(werte);
  res.status(200).end();
});



//
// POST
//
app.post("/api/cities", (req,res) => {
var population=req.body.population;

console.log("Population: "+population);
res.end("yes");
});



app.listen(3000, function (){console.log("Listening on Port 3000!")});
