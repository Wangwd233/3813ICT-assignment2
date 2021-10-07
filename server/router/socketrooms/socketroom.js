const { MongoClient } = require('mongodb');

module.exports = {
    createcol:function(db){
        db.collection('socketroom').drop(function(err, delOK) {
            if (err) throw err;
            if (delOK) console.log("Collection socketroom deleted");
            db.createCollection('socketroom', function(err, res){
                if (err) {
                    return;
                }
                console.log("Collection socketroom Created!");
            });
          });
        
    },

    query: function(db, id, callback){
        var query = {socketid: id};
        db.collection('socketroom').find(query).count((err, num) => {
            if (err) throw err;
            if (num > 0){
               db.collection('socketroom').find(query).toArray(function(err, result){
                   if (err) throw err;
                   callback(result);
               })
            }else{
                
            }
        })
    },

    check: function(db, room, id, callback){
       var query = {roomname: room, socketid: id};
       var Inroom = false;
       db.collection('socketroom').find(query).count((err, num) => {
           if (err) throw err;
           if (num == 0){
              callback(Inroom);
           }else(
              Inroom = true,
              callback(Inroom)
           )
       })
    },

    count: function(db, room, callback){
        var query = {roomname: room};
        db.collection('socketroom').count(query, function(err, num){
            callback(num);
        })
    },

    insert: function(db, room, id, callback){
          var query = {_id: 0, roomname: room, socketid: id};
          var id = 0;
          var msg = '';
          db.collection('socketroom').count({}, function(err, num){
            if (err) throw err;
            id = num + 1;
            query._id = id;
            console.log(query);
            db.collection('socketroom').insertOne(query, function(err, res){
                if (err) throw err;
                msg = 'Join room successfully';
                callback(msg);
            });
        })
    },
    
    delete: function(db, id, callback){
        var query = {socketid: id};
        var msg = '';
        db.collection('socketroom').count(query, function(err, num){
            if (err) throw err;
            if (num > 0){
                db.collection('socketroom').deleteOne(query, function(err){
                    if (err) throw err;
                    msg = 'A user leave room';
                    callback(msg);
                })
            }else{
                msg = 'Oops, something going wrong';
                callback(msg);
            }
        })
    }
}