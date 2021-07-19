var mongoose = require('mongoose'), Room = mongoose.model('room')

module.exports={
    GetAll: function(req,res){
        console.log("GetAll rooms function called...");
        Room.find({},function(err, results){
            if (err) throw err;
            res.render('pages/rooms.ejs',{roomsList:results});
        })        
    }
}
