const { MongoClient, Collection } = require('mongodb');

module.exports = function(app, db, user){
    app.get('/login', function(req, res){
        console.log("In login route");
        const query = {username: user.username};
        db.collection('users').find(query).count(function(err, num){ 
            if (err) throw err;
            if (num > 0 ) {
                db.collection('users').find(query).toArray((err, data) => {
                    if (err) throw err;
                    if (data[0].password == user.password) {
                        res.send('Login successfully!');
                    }else{
                        res.send('Password incorrect, please try again!');
                    }
                })
            }else{
                res.send('Username does not exist!');
            }
        })

    })
}
