var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var app = express()

// const methodOverride = require('method-override');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static('public'));
// app.use(methodOverride('_method'));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')

require('./models/roommodel');
require('./models/bookingmodel');

db_URL = db_url = "mongodb+srv://user1:Password@cluster0.qyjhe.mongodb.net/Hotel_db?retryWrites=true&w=majority";

mongoose.connect(db_URL, {useUnifiedTopology:true, useNewUrlParser:true}, function(){
  console.log("Successfully connected to the database");
})


// index page
app.get('/', function(req, res) {  
    res.render('pages/index');
  });
  
// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
  });

// rooms page
var roomController = require('./controllers/roomcontroller.js');
app.get('/rooms', roomController.GetAll);

// all bookings page
var bookingController = require('./controllers/bookingcontroller.js');
app.get('/allbookings', bookingController.GetAll);
app.get('/bookings/findbyemail', bookingController.GetByEmail);

// booking form
app.get('/book', function(req,res){
  res.render('pages/booking-form.ejs')
});

//new booking
app.post('/booking/new',bookingController.Create);


// room-details page
app.get('/room-details', function(req, res) {
  res.render('pages/room-details');
});

//pass booking
app.get('/book/:type', function(req,res){
  res.render('pages/booking-form.ejs')
});

// manage bookings page
app.get('/manage_bookings', function(req, res) {
    res.render('pages/manage_bookings');
  });


app.listen(3000);
console.log('Server is listening on port 3000');