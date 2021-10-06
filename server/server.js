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
const createUser = require('./router/user/create');

const roomlist = require('./router/socketrooms/roomlist.js');
const roomdb = require('./router/socketrooms/rooms-crud.js');

const { urlencoded } = require('express');
//const deleteUser = require('./router/user/deleteUser');

//Create database
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created");
    const dbo = db.db('chatProject');

    //create collection chat if not exist
    dbo.createCollection('chat', function(err, res){
        if (err) {
            return;
        }
        console.log("Collection chat Created!");
    });

    //Create collecction rooms and input some data if it is not have been inserted
    roomlist.insert(dbo);

    //Create collection users and insert user information into users if it is not have been inserted
    userInsert.insert(dbo);
    
    //login route
    login(app, dbo);

    //create user route
    createUser(app, dbo);

    //deleteUser.delete(dbo);

    //socket connect
    sockets.connect(io, PORT, dbo);

})



//Define port used for the server
const PORT = 3000;

//Apply express middleware
app.use(cors());

//setup Socket


//Start server listening for requests
Server.listen(http, PORT);



/*var cors = require('cors');
app.use(cors());

app.use(express.static(__dirname + '/../dist/my-app'));
console.log(__dirname);*/


//app.post('/login', require('./router/postlogin'));
//app.post('/loginafter', require('./router/postLoginafter'));