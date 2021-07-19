var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var app = express()

const methodOverride = require('method-override');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(methodOverride('_method'));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')

require('./models/roommodel');

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

// book room
app.get('/book', function(req,res){
  res.render('pages/booking-form.ejs')
});


// room-details page
app.get('/room-details', function(req, res) {
  res.render('pages/room-details');
});

// booking page
app.get('/make_booking', function(req, res) {
    res.render('pages/make_booking'); 
  });

// manage bookings page
app.get('/manage_bookings', function(req, res) {
    res.render('pages/manage_bookings');
  });


function insertNewCustomer(newCustomer){
  mongoClient.connect(db_url, function(err, dbServer) {
      if (err) throw err;
      var myDatabase = dbServer.db(db_name);
      myDatabase.collection('customers').insertOne(newCustomer, function(err, result){
          if (err) throw err;
          console.log("1 document inserted");
          dbServer.close();
      });
  });
}


var cust1 = {id:101, first_name:'John', last_name: 'Doe', contact_number: '4371234567', email: 'john_doe@mail.com'}
// insertNewCustomer(cust1);

app.listen(3000);
console.log('Server is listening on port 3000');