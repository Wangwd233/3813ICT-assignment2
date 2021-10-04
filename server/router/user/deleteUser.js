const { MongoClient } = require('mongodb');

module.exports = {
    delete: function(db){
        db.collection("users").drop(function(err, delOK) {
            if (err) throw err;
            if (delOK) console.log("Collection deleted");
          });
    }
}
