var mongoose = require('mongoose');

var bookingSchema = new mongoose.Schema(
    {
        first_name:{type:String},
        last_name:{type:String},
        check_in:{type:Date},
        check_out:{type:Date},
        room_type:{type:String},
        email:{type:String},
        phone:{type:String},
        bookingref:{type:String}
    }
);
mongoose.model('booking',bookingSchema);