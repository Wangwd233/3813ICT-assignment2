const { MongoClient } = require('mongodb');

room = {_id: 0, roomname: ''};

module.exports = {
    roomlist: function(db, callback){
        db.collection('rooms').find({}).toArray((err, data) => {
            if (err) throw err;
            var result = data;
            callback(result);
        })
        
    },

    roomcreate: function(db, name,callback){
        room.roomname = name;
        var query = {roomname: room.roomname};
        var msg = '';
        var id = 0;
        
        db.collection('rooms').count(query, function(err, num){
            if (err) throw err;
            if (num == 0) {
                db.collection('rooms').count({}, function(err, num){
                    id = num + 1;
                    room._id = id;
                    query = room;
                    db.collection('rooms').insertOne(query, function(err, res){
                        if (err) throw err;
                    });
                    msg = 'create room successfully';
                       callback(msg);
                })                                                                
            }else{
                msg = 'Already have the room';
                callback(msg); 
            }     
        })

    }
}
