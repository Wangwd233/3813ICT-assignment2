var assert = require('assert');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'chatProject';
const client = new MongoClient(url);
const dbo = client.db(dbName);
const users= 'users';

var app = require('express');
var chai = require('chai');
var request = require('request');
//var chaiHttp = require('chai-http');
var should = chai.should();

//var userInformation = require('../router/user/userInformation.js');
var roomcrud = require('../router/socketrooms/rooms-crud.js');
var chat = require('../router/chatmessages/chat');

describe('Server test', function(){
    //The function passed to before() is called before running the test cases
    before(function() {console.log("before test");});
    //The function passed to after() is called after running the test cases
    after(function() {console.log("after test");});

    describe('query chat', function(){
        it('should return a array of all chat logs in a room', (done) => {
            chat.query(db, 'room1', function(log){
               var log1 = db.collection('chatmessages').find({room: 'room1'}).toArray();
               assert.equal(log, log1);
            })
            done();
        })
    })

    describe('create room', function() {
        it('should return create room successfully', (done) => {
            client.connect(function(){
                roomcrud.roomcreate(dbo, 'room100', function(msg){
                   assert.equal(msg, 'create room successfully');
                })
            })
            done();
        })
    })



})



