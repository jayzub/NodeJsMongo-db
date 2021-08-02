var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var session = require('express-session');
const methodOverride = require("method-override");

var app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride('_method',{
  methods:["POST", "GET"]
}));
var urlencoder = express.urlencoded({extended:false});

app.use(express.static('public'));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')
app.use(session({secret: "Secret Key!", resave: false, saveUninitialized: true, cookie: {maxAge: 300000}}));

app.locals.dateFormat = function(date) {
  return moment(date).format('YYYY-MM-DD');
}

var moment = require('moment');  


require('./models/roommodel');
require('./models/bookingmodel');
require('./models/roommodel');
require('./models/loginmodel');

db_URL = db_url = "mongodb+srv://user1:Password@cluster0.qyjhe.mongodb.net/Hotel_db?retryWrites=true&w=majority";

mongoose.connect(db_URL, {useUnifiedTopology:true, useNewUrlParser:true}, function(){
  console.log("Successfully connected to the database");
})

var indexController = require('./controllers/indexcontroller.js');
var roomController = require('./controllers/roomcontroller.js');
var bookingController = require('./controllers/bookingcontroller.js');
var registercontroller = require('./controllers/registercontroller.js');
var logincontroller = require('./controllers/logincontroller.js');

// index page
app.get('/',indexController.GetAll);
app.get('/findbytype',indexController.GetRoom);


// rooms page
app.get('/rooms', roomController.GetAll);
app.get('/room-details',indexController.GetEachRoom);
app.get('/book/:type', function(req,res){
  res.render('pages/booking-form.ejs')
});

// bookings
// app.get('/allbookings', bookingController.GetAll);
app.get('/bookings/findbyemail', bookingController.GetByEmail);
app.get('/bookings/findbyref', bookingController.GetByRef);
app.post('/booking/new',bookingController.Create);
app.get('/book', function(req,res){
  res.render('pages/booking-form.ejs')
});
app.get('/manage_bookings', function(req, res) {
  res.render('pages/manage_bookings');
});
app.get('/bookings/edit/:bookingref', bookingController.EditBooking);
app.post('/bookings/update/:bookingref', bookingController.UpdateBooking);
app.delete('/bookings/cancel/:bookingref', bookingController.CancelBooking);


// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});



app.use(function (req, res, next) {
  if(req.session.user !== undefined){
    res.locals.user = req.session.user;
  } 
  else{
    res.locals.user = null;
  }
  next()
  })

// Login form
app.get('/login', function(req,res){
  
  res.render('pages/Login.ejs')
});

// Registration form
app.get('/Register', function(req,res){
  res.render('pages/Register.ejs');
});

// app.get('/login',logincontroller.Loginform);
app.post('/login',logincontroller.Login);

// app.get('/register',registercontroller.Registerform);
app.post('/Register',registercontroller.InsertData);


// Logout
app.get('/logout', function(req,res){
  req.session.destroy();
  req.session.username = undefined;
  console.log(req.session.username)
  res.redirect('/')
});

app.listen(3000);
console.log('Server is listening on port 3000');