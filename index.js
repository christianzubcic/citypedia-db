/*const express = require('express');
const app = express();
const bp = require('body-parser');
const mongo = require('mongodb');

app.use(bp.json());

const url = `mongodb://localhost:27017/mydb`;
let database;
mongo.MongoClient.connect(url, function(err, db) {
  if (err) {
    throw err;
  }
  database = db;
});

//get endpoint für /api/test
app.get("/api/test", (req,res) => {

  console.log("GET auf api/test");

  //TODO: datenbank auslesen

  //close connection with status code 200 (=OK)
  res.status(200).end();
});


//post endpoint für /api/test
app.post("/api/test", (req,res) => {

  console.log("POST auf api/test");

  //TODO: datenbak bearbeiten

  res.status(200).end();
});


//port 3000
app.listen(3000, function (){console.log("Port:3000")});


console.log(database);

*/

var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
// Defines the root route. router.get receives a path and a function
// The req object represents the HTTP request and contains
// the query string, parameters, body, header
// The res object is the response Express sends when it receives
// a request
// render says to use the views/index.jade file for the layout
// and to set the value for title to 'Express'
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/thelist', function(req, res){

  // Get a Mongo client to work with the Mongo server
  var MongoClient = mongodb.MongoClient;

  // Define where the MongoDB server is
  var url = 'mongodb://localhost:27017/mydb';

  // Connect to the server
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the Server', err);
  } else {
    // We are connected
    console.log('Connection established to', url);

    // Get the documents collection
    var collection = db.collection('cities');

    // Find all cities
    collection.find({}).toArray(function (err, result) {
      if (err) {
        res.send(err);
      } else if (result.length) {
        res.render('citylist',{

          // Pass the returned database documents to Jade
          "citylist" : result
        });
      } else {
        res.send('No documents found');
      }
      //Close connection
      db.close();
    });
  }
  });
});

// Route to the page we can add cities from using newCities.jade
router.get('/newCity', function(req, res){
    res.render('newCity', {title: 'Add City' });
});

router.post('/addCity', function(req, res){

    // Get a Mongo client to work with the Mongo server
    var MongoClient = mongodb.MongoClient;

    // Define where the MongoDB server is
    var url = 'mongodb://localhost:27017/mydb';

    // Connect to the server
    MongoClient.connect(url, function(err, db){
      if (err) {
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');

        // Get the documents collection
        var collection = db.collection('cities');

        // Get the city data passed from the form
        var city1 = {city: req.body.city, population: req.body.population,
          size: req.body.size, unemployment: req.body.unemployment, random: req.body.random,
          radom2: req.body.radom2};

        // Insert the city data into the database
        collection.insert([city1], function (err, result){
          if (err) {
            console.log(err);
          } else {

            // Redirect to the updated city list
            res.redirect("thelist");
          }

          // Close the database
          db.close();
        });

      }
    });

  });

module.exports = router;
