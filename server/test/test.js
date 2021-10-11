var assert = require('assert');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'chatProject';
const client = new MongoClient(url);
const dbo = client.db(dbName);
const io = require('socket.io-client');
var socketURL = 'http://localhost:3000';
var options = {
    transports: ['websocket'],
    'force new connection': true
};

const sockets = require('../socket.js');


var app = require('express');
var chai = require('chai');
//var chaiHttp = require('chai-http');
var request = require('request');
//var chaiHttp = require('chai-http');
var should = chai.should();
//chai.use(chaiHttp);

//var userInformation = require('../router/user/userInformation.js');
var login = require('../router/user/login.js');
var roomcrud = require('../router/socketrooms/rooms-crud.js');
var chat = require('../router/chatmessages/chat');
var socketroom = require('../router/socketrooms/socketroom.js');

var room = 'room1';
var id = '365465';
var message = 'hello';

describe('Server test', function(){
    //The function passed to before() is called before running the test cases
    before(function() {console.log("before test");});
    //The function passed to after() is called after running the test cases
    after(function() {console.log("after test");});

    describe('query chat', function(){
        it('should return a array of all chat logs in a room', (done) => {
            client.connect(function(){
                chat.query(dbo, room, function(log){
                    dbo.collection('chatmessages').find({room: room}).toArray(function(temp){
                        assert.equal(log, temp);
                        done();
                    });
                    
                 })
            })
            
            
        })
    })
    
    describe('insert new message', function(){
        it('should return message saved successfully', (done) => {
            client.connect(function(){
                chat.insert(dbo, 'room3', 'Bob@gmail.com', 'test', function(msg){
                    assert.equal(msg, 'messages saved successfully');
                    done();
                })
            })
            
            
        })
    })

    describe('joinroom', function(){
        it('should return Join room successfully', (done) => {
            client.connect(function(){
                socketroom.insert(dbo, room, id, function(msg){
                    assert.equal(msg, 'Join room successfully');
                    done();
                })
            })
            
            
        })
    })

    describe('check if Inroom', function(){
        it('should return Inroom', (done) => {
            client.connect(function(){
                socketroom.check(dbo, room, id, function(Inroom){
                    assert.equal(Inroom, true);
                    done();
                })
            })
            
            
        })
    })

    describe('count user in room', function(){
        it('should return a number', (done) => {
            client.connect(function(){
                socketroom.count(dbo, room, function(num){
                    assert.equal(num, '1');
                    done();
                })
            })
            
            
        })
    })

    

    describe('query room', function(){
        it('should return a array of all rooms', (done) => {
            client.connect(function(){
                roomcrud.roomlist(dbo, function(room){
                    dbo.collection('rooms').find({}).toArray(function(temp){
                        assert.equal(room, temp);
                        done();
                    });
                    
                 })
            })
            
            
        })
    })

    /*describe('create room', function() {
        it('should return create room successfully', (done) => {
            client.connect(function(){
                roomcrud.roomcreate(dbo, 'room50', function(msg){
                   assert.equal(msg, 'create room successfully');
                })
            })
            done();
        })
    })*/

    /*describe("login", () => {
        describe("/api/login", () => {
            // Test to get all students record
            it("should check if user information correct", (done) => {
                 chai.request(app)
                     .get('/api/login')
                     .end((err, res) => {
                         res.should.have.status(200);
                         res.body.should.be.a('string');
                         done();
                      });
             });
        })
    })*/
    describe('socket test', function(){
        describe('socket', function(){
            var client1 = io.connect(socketURL, options);
            client1.on('connect', () => {
                client1.emit('joinroom', room);
                client1.emit('message', message);
                
                var client2 = io.connect(socketURL, options);
                client2.on('connect', () => {
                    client2.emit('joinroom', room);
                    client2.emit('message', 'test2');
                })

                client1.on('message', (data) => {
                    assert.equal(data, msg)
                    client1.emit('leaveroom', room);
                    client1.disconnect();
                });

                client2.on('message', (data) => {
                    data1 = JSON.parse(data);
                    assert.equal(data1[1], 'test2')
                    client2.emit('leaveroom', room);
                    client2.disconnect();
                    done();
                })
            })
        })
        
    })

    describe('leaveroom', function(){
        it('should return A user leave room', (done) => {
            client.connect(function(){
                socketroom.delete(dbo, id, function(msg){
                    assert.equal(msg, 'A user leave room');
                    done();
                })
            })
            
            
        })
    })
    



})



