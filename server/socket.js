const { Socket } = require("socket.io");
const util = require('util');
const roomop = require('./router/socketrooms/rooms-crud.js');
const socketroom = require('./router/socketrooms/socketroom.js');
const chat = require('./router/chatmessages/chat.js');

module.exports = {

    connect: function(io, PORT, db){
        var rooms=["room1", "room2", "room3", "room4"];//list of rooms
        var socketRoom = [];//list of socket.id and joined rooms
        var socketRoomnum = [];
        var roomlist = '';

        //Example of creating a socket.io namespace
           
           io.on('connection', (socket) => {

             //Event to send message back to the clients
             socket.on('message', (message, user)=>{
                 console.log(message);
                 console.log(user);
                 
                 socketroom.query(db, socket.id, function(result){
                    room = result[0].roomname;
                    chat.insert(db, room, user, message, function(msg){
                        console.log(msg);
                        chat.query(db, room, function(log){
                            io.to(room).emit('message', JSON.stringify(log));
                        });
                    });
                 })
                     
                 //for(i=0; i<socketRoom.length; i++){
                     //check each if current socket id has joined a room
                     //if (socketRoom[i][0] == socket.id ){
                         //emit back to the room
                         //chat.to(socketRoom[i][1]).emit('message', message);
                    // }
                 //}
             });
             //User has requested to add a new room, check it does not already exist
             socket.on('newroom', (newroom)=>{
                
                  roomop.roomcreate(db, newroom, (data) => {
                       var result = data;
                       console.log(result);
                       roomop.roomlist(db, function(data){
                         roomlist = data;
                         io.emit('roomlist', JSON.stringify(roomlist));
                         socket.emit('notice', result);
                       });
                   });   

             });

             socket.on('roomlist', (m)=>{
                 console.log(m);
                 
                 roomop.roomlist(db, function(data){
                     roomlist = data;
                     io.emit('roomlist', JSON.stringify(roomlist));
                 });
                 
                 
             });

             socket.on('numusers', (room)=>{
                 var usercount = 0;

                 for (i=0; i<socketRoomnum.length; i++){
                     if(socketRoomnum[i][0] == room){
                         usercount = socketRoomnum[i][1];
                     }
                 }

                 chat.in(room).emit('numusers', usercount);

             });

             //join a room
             socket.on("joinRoom", (room)=>{
                 var query = {roomname: room};
                 db.collection('rooms').find(query).toArray((err, data) => {
                     if (err) throw err;
                     if(data){
                         socket.join(room);
                            socketroom.check(db, room, socket.id, function(Inroom){
                                console.log(Inroom);
                                if (Inroom == false){
                                    socketroom.insert(db, room, socket.id, function(msg){
                                        console.log(msg);
                                        socketroom.count(db, room, function(num){
                                            io.to(room).emit('numusers', num);
                                        })
                                        io.to(room).emit('notice', "A new user has joined");
                                        socket.emit('joined', true);
                                        chat.query(db, room, function(log){
                                            socket.emit('message', JSON.stringify(log));
                                        })
                                    });
                                }else{
                                    io.to(room).emit('notice','User is already in the room');
                                }
                            }); 
                     }else{
                        io.to(room).emit('notice','not have such room');
                     }
                 })

             });

             //leave a room
             socket.on("leaveRoom", (room)=>{
                 socketroom.delete(db, socket.id, function(msg){
                     console.log(msg);
                     socket.leave(room);
                     socketroom.count(db, room, function(num){
                        io.to(room).emit('numusers', num);
                     })
                     io.to(room).emit("notice", "A user has left");
                     socket.emit('joined', false);
                 })    
             });

             //event to disconnect from the socket
             socket.on('disconnect', ()=>{
                 var room = '';
                 //chat.emit("disconnect");
                 socketroom.query(db, socket.id, function(result){
                     room = result[0].roomname;
                     socketroom.delete(db, socket.id, function(msg){
                         console.log(msg);
                         socket.leave(room);
                         socketroom.count(db, room, function(num){
                            io.to(room).emit('numusers', num);
                         })
                         io.to(room).emit("notice", "A user has disconnected");
                     })
                 });
                 
                 console.log("Client disconnected");
             })
           })
    }
}