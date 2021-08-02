var mongoose = require('mongoose'), Room = mongoose.model('room')

module.exports={
    GetAll: function(req,res){
        console.log("GetAll rooms function called...");
        Room.find({},function(err, results){
            if (err) throw err;
            res.render('pages/rooms.ejs',{roomsList:results});
        })        
    },

    GetEachRoom: function(req,res){
        console.log('this is from geteachroom in indexcontroller');
        var id=req.query.id;
        console.log(id);
        Room.find({type:id},function(err, results){
            if (err) throw err;
            console.log(id);
            res.render('pages/room-details.ejs',{id,results});
        })   
    }
}
