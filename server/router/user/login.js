const { MongoClient, Collection } = require('mongodb');

module.exports = function(app, db){
    app.get('/login', function(req, res){
        console.log("In login route");
        db.collection('users').find().toArray((err, data) => {
            if (err) throw err;
            console.log(data);
        })

    })
}
