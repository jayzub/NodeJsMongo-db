var mongoose = require('mongoose'), Booking = mongoose.model('booking')
var mongoose = require('mongoose'), Room = mongoose.model('room')

module.exports={
    GetAll: function(req,res){
        console.log("GetAll bookings function called...");
        Booking.find({},function(err, results){
            if (err) throw err;
            res.render('pages/bookings.ejs',{allBookings:results});
        })        
    },

    Create:function(req,res){
        console.log("I am inside create new booking");
        var bookingInfo = req.body;
        console.log(bookingInfo);
        Booking.create(bookingInfo, function(err, result){
            if (err) {res.render("Error making booking")}
            res.redirect('/')
        })
    },

    GetByEmail:function(req,res){
        console.log("I am inside get booking by email");
        const {email} = req.query;
        Booking.find({email}, function(err, result){
            if (err) throw err;
            res.render('pages/bookings.ejs',{allBookings:result})
        })
    }
}
