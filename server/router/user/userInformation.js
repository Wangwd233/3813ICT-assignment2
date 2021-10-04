const { MongoClient, Collection } = require('mongodb');

const user = [
    {username: 'Bob@gmail.com', password: '123456'},
    {username: 'Fred@gmail.com', password: '123456'},
    {username: 'Alice@gmail.com', password: '666666'},
]

module.exports = {
    insert: function(db){
        db.collection('users').insertMany(user, function(err){
            if (err) throw err;
            db.collection('users').find({}).toArray((err, data) => {
                if (err) throw err;
                console.log(data);
                console.log('Insert successfully');
            })
        })
    }
}