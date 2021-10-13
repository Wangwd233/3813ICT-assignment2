# Documentation
Here is the Documentation of 3813ICT software frameworks assignment2

## Git
In this git repository the server side code saved in folder named server, and all angular components and service files are stored in folder src.

Every time I finish the development of a large part such as the set of server, after implement and check the login and logout function, I will save my work and push it to the github repository, so if I have some issue lose some of my code or I didn't satisfied with the change in later development, I can pull the branch from github to restore my latest version.

## Data structures
This project use MongoDB to save data, the database has five collections, which are: users, rooms, socketrooms, and chatmessages.

### Collection users 
The collection users contain a list of user informations: username, password and type (admin or user). And this collection is used for user authentication, to check username and password in the back-end.

### Collection rooms
This collection stored the list of all rooms (channels) with: roomname. The roomname is unique for the purpose of dividing different channels. 

### Collection socketrooms
This collection have two colomns which are: roomname and socketid (unique). This collection is created for recognize and store the user status when the user join in a room.

### Collection chatmessages
The collection chatmessages stores all chat messages send by users, it has three colomns: room (roomname), user (username), message. This collection is created for storing all chat messages and who (user) in which room send it. It waits the server to check and get the chat history for a room.

## REST API
The chat application use REST API to communicates between server and client side. There are two routes defined for user authentication: login and logout.
route: 1. '/api/login'
          parameters: user, userlist; return value: msg, isLogin, user; purpose: to check if a user can login.
       2. '/api/logout'
          parameters: user; return value: ; purpose: to remove user in the userlist from login.

### Route login
The actual route path is: '/api/login'. There will be a JSON parameter passed from client when the route is called, the http method is POST. And login route will query the database use the username which contains in the parameter to check if the user exist, and then compare if the password correct, save the user in the userlist, and return three parameters: msg, isLogin and user. Parameter msg contains the message to tell client if login success, and parameter isLogin is a boolean which let the client side check if the login action success. And user information are in the parameter user.

### Route logout
This route will be called with path: '/api/logout'. This route also require a JSON parameter with all user informations which POST by the http. This route will check the userlist to find if the user is already login and if true, it will then remove the user from the userlist to let them logout. 

# Angular architecture
The Angular architecture is:
Components: 1. loginComponent
            2. chatComponent
Routes: 1. path: '/'; for loginComponent, the chatComponent is the child component of login.
Models: import BrowserModule, AppRoutingModule, FormsModule, HttpClientModule.
Services: socketService.

## Component

### login Component
This component is generated for let user login with username and password, after user input the username and password, they click the login button will trigger a function in the component called getUser(). This function will use http POST method to send the username and password to the server side with route '/api/login' and will receive the return value of msg to show client side and the parameter to check if login succeed. when login successfully, the user detail will print on the page with a logout button, and the logout button will trigger the function logout(), which will let user leave the current room first if user is in a room, and then POST logout requirement to the path '/api/logout' at server side, it will set the parameter isLogin to false and that will let user see the login interface again to notice the user has logout.

### chat Component
The chat component is the child component of login component, only after the user has login successfully can show this component, it will use the socket service to require for the list of all room names from the server side, and list in the page for user to choose and join. The admin can create room by input room name and click the button, the function createroom() will trigger and the room name will send to server side and add to the database, and the component also recevive the new room list with the room created.

When user choose a room and click join room, the function joinroom() will trigger, send room name to the server side user socket service and user will join room to see how many users in current room, and can send chat messages. If user input messages and click 'chat' button, the function chat() will be triggered, and send the message to server side use method in socket service. Server side will return the messages which have sent by the user in this room and show it in the chat content with username. 

if user in a room click on the 'leave room' button, the function leaveroom() will be triggered, and it will call socket service leaveroom() function, which will send the room name to the server to let server emit leaveroom notice to other users in the room and let the user leave room.

## Service

### socket Service
This service is generated for component use to connect server and send web socket. There are a list of service wait for calling:
1. sendMessage(): When this function is called it will emit to server with message and user detail;
2. joinroom(): This function will emit room name to the server by socket API "joinRoom" when it is called;
3. leaveroom(): This function will emit room name to server socket API "leaveRoom" when it is called;
4. joined(): This function will create a observable to receive a boolean send from server;
5. createroom(): This function will send new room name to server by socket API "newroom" when it is called;
6. getnumuser(): This function will create a observable to wait receive the count of number of users in the current room;
7. reqroomList(): This function will require for the room list from server side;
8. getroomList(): This function will create a obversable and wait for get room list from server side with socket API "roomlist";
9. notice(): This function will create a obversable and wait for get any notice that send by socket API "notice";
10. getMessage(): This function will create a obversable and wait for get the message history which emit from server side by socket API "message".





