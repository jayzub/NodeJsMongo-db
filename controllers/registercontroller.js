var mongoose = require('mongoose'), Users = mongoose.model('users')

module.exports={
    Registerform:function(req,res){
        res.render('/Register');
    },
    InsertData: function(req,res){
        console.log("Insert function called...");

        var firstname=req.body.firstname;
        var lastname=req.body.lastname;
        var phonenumber=req.body.phonenumber;
        var username=req.body.username;
        var password=req.body.password;
        var emailid=req.body.emailid;
        var msg="User Register Successfully.";

        
        var register={"firstname":firstname,"lastname":lastname,"phonenumber":phonenumber,"username":username,"password":password,"emailid":emailid}

        Users.create(register,function(err,result){
            if(err) throw err;
            console.log("data inserted successfully");
            res.render("pages/Login.ejs",result);
            console.log(result);
        });
    }
}
