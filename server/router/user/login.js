const { MongoClient, Collection } = require('mongodb');

module.exports = function(app, db){
    app.post('/api/login', function(req, res){
        console.log("In login route");
        //console.log(req.body.username);
        const query = {username: req.body.username};
        const empty = {}
        db.collection('users').find(query).count(function(err, num){ 
            if (err) throw err;
            if (num > 0 ) {
                db.collection('users').find(query).toArray((err, data) => {
                    if (err) throw err;
                    if (data[0].password == req.body.password) {
                        res.send({msg:'Login successfully', isLogin: true});
                    }else{
                        res.send({msg:'Password does not match', isLogin: false});
                    }
                })
            }else{
                res.send({msg:'Username does not exist!', isLogin: false});
            }
        })

    })
}
