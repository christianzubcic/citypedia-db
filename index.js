var express = require('express');
const bodyParser= require('body-parser');
var mongodb = require('mongodb');
const CLIENT_ID = "340370812528-fqkdef2ah126p3i1opeuqslgtv9vnu61.apps.googleusercontent.com";
var url = "mongodb://localhost:27017/citypedia-db";

var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;
var client = new auth.OAuth2(CLIENT_ID, '', '');


const mongoClient = mongodb.MongoClient;
const app = express();
let db // Datenbank handle
let cities
let city

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

//GET ALL CITIES


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

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
  mongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("database-db");
    dbo.collection("citycollection").find({}).toArray(function(err, result) {
      if (err) throw err;
      cities = result;
      console.log("Cities loaded");
      res.send(cities);
      res.status(200).end();
    });
  });

});


app.get("/api/city/:name", (req,res) => {
  //werte aus db lesen
  mongoClient.connect(url, function(err, db) {
    var name = req.params.name;
    if (err) throw err;
    var dbo = db.db("database-db");
    dbo.collection("citycollection").find({ cityname: name }).toArray(function(err, result) {
      if (err) throw err;
      city = result;
      console.log("City loaded");
      res.send(city);
      res.status(200).end();
    });
  });

});



//
// POST
//

//TODO FIX BUG IN DB-CONSOLE

app.post("/api/userauth", (req, res) => {
  var token = req.get("Authorization");

  if (token == null) {
    res.send({loggedin: false}).status(200).end();
    return;
  }

  //token = token.replace(/(B|b)earer( )*/i,"");

  client.verifyIdToken(token, CLIENT_ID, (e, login) => {
    console.log("---------------------------------------------");
    console.log(e);
    console.log("---------------------------------------------");
    console.log(login);
    console.log("---------------------------------------------");
    // var payload = login.getPayload();
    // var userid = payload['sub'];
    if(e != null || login == null) {
      res.send({loggedin: false}).status(200).end();
      return;
    } else {
      res.send({loggedin: true}).status(200).end();
    }

  });
});


app.post("/api/cities", (req,res) => {
var cityname=req.body.cityname;
var country=req.body.country;
var population=req.body.population;
var area=req.body.area;
var avgtemp=req.body.avgtemp;
var nou=req.body.nou;
var urate=req.body.urate;
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
  country: country,
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
console.log("Country: " +country);
console.log("Population: "+population);
console.log("Area: "+area);
console.log("AvgTemp: " +avgtemp);
console.log("Nou: " +nou);
console.log("isCapital: " +isCapital);
console.log("hasLakes: " +hasLakes);
console.log("hasTrainstation: " +hasTrainstation);
console.log("link: " +link);
res.end("submitted");
});



app.listen(3000, function (){console.log("Listening on Port 3000!")});
