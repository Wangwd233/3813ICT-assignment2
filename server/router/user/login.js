const { MongoClient, Collection } = require('mongodb');

module.exports = function(app, db){
    app.post('/api/login', function(req, res){
        console.log("In login route");
        console.log(req.body);
        /*const query = {username: user.username};
        const empty = {}
        db.collection('users').find(query).count(function(err, num){ 
            if (err) throw err;
            if (num > 0 ) {
                db.collection('users').find(query).toArray((err, data) => {
                    if (err) throw err;
                    if (data[0].password == user.password) {
                        res.send(data);
                    }else{
                        res.send(empty);
                    }
                })
            }else{
                res.send('Username does not exist!');
            }
        })*/

    })
}
