var mongoose = require('mongoose');

var RegisterSchema = new mongoose.Schema(
    {
        firstname:{type:String},
        lastname:{type:String},
        phonenumber:{type:String},
        username:{type:String},
        password:{type:String},
        emailid:{type:String}
    }
);
mongoose.model('users',RegisterSchema);