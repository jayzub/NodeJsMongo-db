var mongoose = require('mongoose'), Room = mongoose.model('room')
module.exports={
    GetRoom:function(req,res){
        const name = req.query.rooms;
        if (name=="All"){
            console.log(name);
            Room.find({},function(err, results){
                console.log("hi");
                if (err) throw err;
                res.render('pages/rooms.ejs',{roomsList:results});               
            }) 
        }
        else{
            Room.find({type:name},function(err, results){
                if (err) throw err;
                res.render('pages/rooms.ejs',{roomsList:results});
                console.log(results);
        })
        }
    },
    GetAll:function(req,res){
        Room.find({},function(err, results){
            if (err) throw err;
            res.render('pages/index.ejs',{roomsList:results});
        })        
    },
    GetEachRoom: function(req,res){
        var id=req.query.id;
        console.log(id);
        Room.find({type:id},function(err, results){
            if (err) throw err;
            console.log(id);
            
            res.render('pages/room-details.ejs',{id,results});
        })   
    }
}