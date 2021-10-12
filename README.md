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

### Route login



