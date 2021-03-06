# chat-socketio-server
This is Nodejs-express-socket.io chat server.

## Improvements
* support multi servers communications by using external data store(redis) to store the users sockets ids "globally".
* more error handling on unhandled spots.
* using encrypt the password in login and register process.
* creating a simple client for testing.

## Installation

```bash
npm install
```
## Guidelines
* create local env file
* add the local mysql db config to the env file
* add a SECRET property to the env file( for the jwt process)
* run ```bash npm``` start to start the server

## Mysql DB scheme
one user table
![user_table](user_table.jpg)

## Client requests examples
 
### login and register routes
endpoint http://localhost:3000/user/"requested command"(i.e http://localhost:3000/user/register)
method: post
body: {
    username:xx,
    email:xx,
    password:xx
}

### socket.io event
* connetion:
root domain + token (i.e http://localhost:8080?token="token")

*****************************************************************
* spin: send message to random user.
root domain + token + (i.e http://localhost:8080?token="token");
event: spin
data: String

******************************************************************
* wild: send a message to X random users.
root domain + token (i.e http://localhost:8080?token="token")
event: wild
data: Object {message:String, quantity:Integer}

******************************************************************
* blast: sends a message to all users
root domain + token (i.e http://localhost:8080?token="token")
event: blast
data: String








