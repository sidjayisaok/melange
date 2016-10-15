//dependencies
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var favIcon = require('serve-favicon');
var Port = process.env.PORT || 8000;

//middleware stuff
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//basic get request for home page
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/About.html');
});

//basic get request for tip calculator page
app.get('/restaurant', function(req, res){
  res.sendFile(__dirname + '/public/restaurant.html');
});

//basic get request for BMI calculator page
app.get('/BMI', function(req, res){
  res.sendFile(__dirname + '/public/BMI.html');
});

//basic get request for BMI calculator page
app.get('/currency', function(req, res){
  res.sendFile(__dirname + '/public/currency.html');
});

//fire up the server
app.listen(Port, function(){
  console.log('Jet Set Radio broadcasting on channel ' + Port)
});