const express = require('express');
const methodOverride = require('method-override');
const app = express();

app.use(express.static('public'));
app.use(methodOverride('_method'));
app.set('view engine','ejs')

var urlencoder = express.urlencoded({extended:false});

const mongoClient = require('mongodb').MongoClient;
const db_url = "mongodb+srv://user1:Password@cluster0.qyjhe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const db_name = "Hotel_db";

// index page
app.get('/', function(req, res) {  
    res.render('pages/index');
  });
  
// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
  });

// booking page
app.get('/make_booking', function(req, res) {
    res.render('pages/make_booking'); 
  });

// manage bookings page
app.get('/manage_bookings', function(req, res) {
    res.render('pages/manage_bookings');
  });

// register page
app.get('/register', function(req, res) {
    res.render('pages/register');
  });

// login page
app.get('/login', function(req, res) {
    res.render('pages/login');
  });


// customers list
app.get("/customersList", function (req, res) {
  mongoClient.connect(db_url, function(err, dbServer) {
      if (err) throw err;
      var myDatabase = dbServer.db('Hotel_db');
      myDatabase.collection("customers").find({}).toArray(function(err, result) {
        if (err) throw err;
        res.render("pages/customersList", { customersList: result });
        dbServer.close();
      });
    });
})


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