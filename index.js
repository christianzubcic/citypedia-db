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
var cityname=req.body.cityname;
var population=req.body.population;
var area=req.body.area;
var avgtemp=req.body.avgtemp;
var nou=req.body.nou;
var urate=req.body.rate;
var isCapital=req.body.isCapital;
var hasLakes=req.body.hasLakes;
var hasTrainstation=req.body.hasTrainstation;

console.log("Cityname: " +cityname);
console.log("Population: "+population);
console.log("Area: "+area);
console.log("AvgTemp: " +avgtemp);
console.log("Nou: " +nou);
console.log("isCapital: " +isCapital);
console.log("hasLakes: " +hasLakes);
console.log("hasTrainstation: " +hasTrainstation);
res.end("yes");
});



app.listen(3000, function (){console.log("Listening on Port 3000!")});
