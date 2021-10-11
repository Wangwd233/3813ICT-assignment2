const { MongoClient, Collection } = require('mongodb');

module.exports = function(app, db){
    var userlist = [];
    isLogin = false;
    app.post('/api/login', function(req, res){
        console.log("In login route");
        //console.log(req.body.username);
        const query = {username: req.body.username};
        var user = {
            username: '', 
            password: '',
            type: '',
          };
        const empty = {}
        db.collection('users').find(query).count(function(err, num){ 
            if (err) throw err;
            if (num > 0 ) {
                db.collection('users').find(query).toArray((err, data) => {
                    if (err) throw err;
                    for(i=0; i<userlist.length; i++){
                        if (userlist[i] == req.body.username){
                            res.send({msg:'User have login somewhere else', isLogin: false, user: user});
                            isLogin = true;
                        }else{
                            isLogin = false;
                        }
                    }
                    if (isLogin == true){
                       res.send({msg:'User have login somewhere else', isLogin: false, user: user});
                    }else{
                    if (data[0].password == req.body.password) {
                        var user = data[0];
                        userlist.push(user.username);
                        console.log(userlist);
                        res.send({msg:'Login successfully', isLogin: true, user: user});
                    }else{
                        res.send({msg:'Password does not match', isLogin: false, user: user});
                    }
                   }
                })
            }else{
                res.send({msg:'Username does not exist!', isLogin: false, user: user});
            }
        })

    })

    app.post('/api/logout', function(req, res){
        console.log('In logout route');
        for(i=0; i<userlist.length; i++){
            if(userlist[i] == req.body.username){
              userlist.splice(i, 1);
            }
        }
        console.log(userlist);
    })

}
