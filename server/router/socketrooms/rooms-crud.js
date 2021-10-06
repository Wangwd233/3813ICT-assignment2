const { MongoClient } = require('mongodb');

room = {roomname: ''};

module.exports = {
    roomlist: function(db){
        db.collection('rooms').find({}).toArray((err, data) => {
            if (err) throw err;
            console.log(data);
        })
    },

    roomcreate: function(db, roomname){
        room.roomname = roomname;
        var query = room;
        db.collection('rooms').count(query, function(err, num){
            if (err) throw err;
            if (num == 0) {
               db.collection('rooms').insertOne(query, function(err, res){
                if (err) throw err;
               });
               console.log('create room successfully')
            }else{
                console.log('Already have the room');
            }
        })
    }
}