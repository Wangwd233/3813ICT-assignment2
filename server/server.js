const express = require('express');
const app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

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

//fake data for user login
//const user = {username: 'Bob@gmail.com', password: '123456'};

const login = require('./router/user/login.js');
const deleteUser = require('./router/user/deleteUser.js');
const { urlencoded } = require('express');
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



/*var cors = require('cors');
app.use(cors());

app.use(express.static(__dirname + '/../dist/my-app'));
console.log(__dirname);*/


//app.post('/login', require('./router/postlogin'));
//app.post('/loginafter', require('./router/postLoginafter'));