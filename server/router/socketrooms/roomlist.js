const { MongoClient } = require('mongodb');

const roomlist = [
    {roomname: 'room1'},
    {roomname: 'room2'},
    {roomname: 'room3'},
];

module.exports = {
    insert: function(db){
        //Create collection rooms if not exist
        db.createCollection('rooms', function(err, res){
            if (err) {
                return;
            }
            console.log("Collection rooms Created!");
        });
        db.collection('rooms').find({}).count(function(err, result) {
            if (err) throw err;
            if (result == 0){
                db.collection('rooms').insertMany(roomlist, function(err){
                    if (err) throw err;
                    db.collection('rooms').find({}).toArray((err, data) => {
                        if (err) throw err;
                        console.log(data);
                        console.log('Insert successfully');
                    })
                })
            }else{
                console.log('roomlist has already inserted');
            }
        })
    }
}