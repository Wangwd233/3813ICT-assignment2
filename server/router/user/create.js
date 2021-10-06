const { MongoClient, Collection } = require('mongodb');

module.exports = function(app, db){
    app.post('/api/create', function(req, res){
        console.log('In create route');
        
    })
}