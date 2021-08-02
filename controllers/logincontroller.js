var mongoose = require('mongoose'), Login = mongoose.model('users')

module.exports={
    Loginform:function(req,res){
        res.render('/login');
    },
    Login:function(req,res){
        var username=req.body.username;
        var password=req.body.password;
        Login.find({'username':username,'password':password},function(err, results){
            if (err) throw err;    
            if(results.length != 0){
                console.log("Login Successful");
                req.session.user = results;
                console.log(req.session.user)
                res.redirect('/')                
            }
            else{
                console.log("Login UnSucessful");
                res.render('pages/Login.ejs',results);
            }
                 
        })        
    }
}
