const { MongoClient } = require('mongodb');

module.exports = {
    createcol:function(db){
        db.createCollection('chatmessages', function(err, res){
            if (err) {
                return;
            }
            console.log("Collection chatmessages Created!");
        });
    },

    query: function(db, room, callback){
       var query = {room: room};
       db.collection('chatmessages').find(query).toArray(function(err, log){
           if (err) throw err;
           callback(log);
       })
    },

    insert: function(db, room, user, message, callback){
        var query = {_id: 0, room: '', user: '', message: ''};
        var id = 0;
        query.room = room;
        query.user = user;
        query.message = message;
        db.collection('chatmessages').count({}, function(err, num){
            if (err) throw err;
            id = num + 1;
            query._id = id;
            console.log(query);
            db.collection('chatmessages').insertOne(query, function(err, res){
                if (err) throw err;
                msg = 'messages saved successfully';
                callback(msg);
            });
        })
    },
}