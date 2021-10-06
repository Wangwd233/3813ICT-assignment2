const { Socket } = require("socket.io");
const roomop = require('./router/socketrooms/rooms-crud');

module.exports = {

    connect: function(io, PORT, db){
        var rooms=["room1", "room2", "room3", "room4"];//list of rooms
        var socketRoom = [];//list of socket.id and joined rooms
        var socketRoomnum = [];
        var roomlist = '';

        //Example of creating a socket.io namespace
        const chat = io.of('/chat');
           
           io.on('connection', (socket) => {

             //Event to send message back to the clients
             socket.on('message', (message)=>{
                 console.log(message);
                 //for(i=0; i<socketRoom.length; i++){
                     //check each if current socket id has joined a room
                     //if (socketRoom[i][0] == socket.id ){
                         //emit back to the room
                         //chat.to(socketRoom[i][1]).emit('message', message);
                         io.emit('message', message);
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
                       });
                   });
                   //rooms.push(newroom);
                  
                
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

                if (rooms.includes(room)) {
                    socket.join(room, ()=>{
                        //check not already in a room
                        var inroomSocketarray = false;

                        for (i=0; i<socketRoom.length; i++){
                            //track who is in each room
                            if (socketRoom[i][0] == socket.id){
                                socketRoom[i][1] == room;
                                inroom = true;
                            }
                        }
                        if (inroomSocketarray == false){
                            //add socketid/room record
                            socketRoom.push([socket.id, room]);
                            var hasroomnum = false;
                            //recalculate the number of users in a room
                            for (let j=0; j<socketRoomnum.length; j++){
                                if (socketRoomnum[j][0]==room){
                                    socketRoomnum[j][1] = socketRoomnum[j][1]+1;
                                    hasroomnum = true;
                                }
                            }
                            //start tracking numbers of users in a room if it has mot been done before
                            if (hasroomnum == false){
                                socketRoomnum.push([room, 1]);
                            }
                        }
                        chat.in(room).emit('notice', "A new user has joined");
                    });
                    return chat.in(room).emit("joined", room);
                }
             });

             //leave a room
             socket.on("leaveRoom", (room)=>{

                for (let i=0; i<socketRoom.length; i++){
                    if (socketRoom[i][0] == socket.id){
                        socketRoom.splice(i, 1);
                        socket.leave(room);
                        chat.to(room).emit("notice", "A user has left");
                    }
                }

                for (let j=0; j<socketRoomnum.length; j++){
                    if (socketRoomnum[j][0] == room){
                        socketRoomnum[j][1] = socketRoomnum[j][1]-1;
                        if(socketRoomnum[j][0] == 0){
                            socketRoomnum.splice(j,1);
                        }
                    }
                }
             });

             //event to disconnect from the socket
             socket.on('disconnect', ()=>{
                 //chat.emit("disconnect");
                 for(let i=0; i<socketRoom.length; i++){
                     if(socketRoom[i][0] == socket.id){
                        socketRoom.splice(i, 1);
                     }
                 }
                 for (let j=0; j<socketRoomnum.length; j++){
                     if(socketRoomnum[j][0] == socket.room){
                         socketRoomnum[j][1] = socketRoomnum[j][1]-1;
                     }
                 }
                 console.log("Client disconnected");
             })
           })
    }
}