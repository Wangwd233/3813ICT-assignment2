const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
    }
});
const sockets = require('./socket.js');
const Server = require('./listen.js');
const request = require('request');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017'; //Connection url

//route config
const userInsert = require('./router/user/userInformation.js');
const login = require('./router/user/login.js');
const deleteUser = require('./router/user/deleteUser.js');
//const deleteUser = require('./router/user/deleteUser');

//Create database
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created");
    const dbo = db.db('chatProject');
    //Create collection users if not exist
    dbo.createCollection('users', function(err, res){
      if (err) {
          return;
      }
      console.log("Collection User Created!");
    });
    //create collection chat if not exist
    dbo.createCollection('chat', function(err, res){
        if (err) {
            return;
        }
        console.log("Collection chat Created!");
    });
    //Insert user information into users if it is not have been inserted
    dbo.collection('users').find({}).count(function(err, result) {
        if (err) throw err;
        if (result == 0){
            userInsert.insert(dbo);
        }else{
            console.log('User has already inserted');
        }
    })
    
    //login route
    login(app, dbo);

    //deleteUser.delete(dbo);

})



//Define port used for the server
const PORT = 3000;

//Apply express middleware
app.use(cors());

//setup Socket
sockets.connect(io, PORT);

//Start server listening for requests
Server.listen(http, PORT);

/*var express = require('express'); //used for routing
var app = express();
app.use(express.json());

var cors = require('cors');
app.use(cors());

app.use(express.static(__dirname + '/../dist/my-app'));
console.log(__dirname);

var http = require("http").Server(app);
var server = http.listen(3000, function() {
    console.log("Server listening on port: 3000");
});*/

//app.post('/login', require('./router/postlogin'));
//app.post('/loginafter', require('./router/postLoginafter'));