var assert = require('assert');

var app = require('../server.js');
var http = require('http');
const { FindCursor } = require('mongodb');

describe('Server test', function(){
    //The function passed to before() is called before running the test cases
    before(function() {console.log("before test");});
    //The function passed to after() is called after running the test cases
    after(function() {console.log("after test");});
})

describe('get/login', function() {
    it('should return all products', function() {
        http.get('http://localhost:3000/login', function(response) {
            console.log(response);

        })
    })
})

