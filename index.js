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
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



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
var link=req.body.link;

var MongoClient = require('mongodb').MongoClient;


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("database-db");



  dbo.collection("citycollection").update({cityname: cityname},
  {
  cityname: cityname,
  population: population,
  area: area,
  avgtemp: avgtemp,
  nou: nou,
  urate: urate,
  isCapital: isCapital,
  hasLakes: hasLakes,
  hasTrainstation: hasTrainstation,
  link: link
  },
  {upsert: true}, function(err, res) {

    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});


console.log("Cityname: " +cityname);
console.log("Population: "+population);
console.log("Area: "+area);
console.log("AvgTemp: " +avgtemp);
console.log("Nou: " +nou);
console.log("isCapital: " +isCapital);
console.log("hasLakes: " +hasLakes);
console.log("hasTrainstation: " +hasTrainstation);
console.log("link: " +link);
console.log("your welcome");
res.end("yes");
});



app.listen(3000, function (){console.log("Listening on Port 3000!")});
