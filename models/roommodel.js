var mongoose = require('mongoose');

var roomSchema = new mongoose.Schema(
    {
        type:{type:String},
        number:{type:Number},
        size:{type:Number},
        occupancy:{type:Number},
        bed:{type:String},
        price:{type:Number},
        image:{type:String}
    }
);
mongoose.model('room',roomSchema);