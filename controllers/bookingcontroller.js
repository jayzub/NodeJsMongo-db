var mongoose = require('mongoose'), Booking = mongoose.model('booking')
var mongoose = require('mongoose'), Room = mongoose.model('room')

module.exports={
    GetAll: function(req,res){
        Booking.find({},function(err, results){
            if (err) throw err;
            res.render('pages/bookings.ejs',{allBookings:results});
        })        
    },

    Create:function(req,res){
        var bookingInfo = req.body;
        Booking.create(bookingInfo, function(err, result){
            if (err) {res.render("Error making booking")}
            else {
                console.log("Booking made")
                res.redirect('/')
            }
        })
    },

    GetByEmail:function(req,res){
        const {email} = req.query;
        Booking.find({email}, function(err, result){
            if (err) throw err;
            res.render('pages/bookings.ejs',{allBookings:result})
        })
    },

    GetByRef:function(req,res){
        const {bookingref} = req.query;
        Booking.find({bookingref}, function(err, result){
            if (err) throw err;
            res.render('pages/bookings.ejs',{allBookings:result})
        })
    },

    EditBooking:function(req,res){
        let bookingref = req.params.bookingref;
        Booking.findOne({bookingref:bookingref}).exec(function(err, result){
            if (err){
                console.log("Error:", err);
            }
            else{
                res.render('pages/edit-booking-form.ejs',{allBookings:result});
            }
        })
    },
    

    UpdateBooking:function(req, res){
        Booking.findByIdAndUpdate()
        var {bookingref} = req.query;
        var newBookingInfo = req.body;
        Booking.updateOne(bookingref, newBookingInfo, function(err, res) {
            if (err) throw err;
            else{
                console.log("Booking updated")
                // res.redirect('/')
                res.render('pages/bookings.ejs')
            }
        })
    },

    CancelBooking:function(req, res){
        let bookingref = req.params.bookingref;
        Booking.remove({bookingref: bookingref}, (error) => {
            if(error){
                console.log(error);
            }else{
                console.log("deleted")
                res.redirect("/")
            }
        })
    }
}
