const socket = require("socket.io");
const auth = require('../middlewares/auth');


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function findNonExsitNumber(map, limit){
    for(let i = 0 ; i<limit ; i++){
        if(!map.has(i)) return i;
    }
}


const initListen = function(server){
    io = socket(server, {cors : {origin :"*"}});
    io.use(auth.socketAuth);
    io.on("connection", (socket) => { 

        io.use(auth.socketAuth);  
        let clients = Array.from(io.sockets.adapter.rooms.keys());

        // send a message to a rendom user
        socket.on("spin", function (data) {
            console.log('spin', data);
            if(clients.length > 2){
                let randomNum = getRandomInt(clients.length);      
                io.to(clients[randomNum]).emit("spin",data);
            } else {
                socket.broadcast.emit("spin", data);
            } 
        });

        // send a message to X random users. X will be determined by the client
        socket.on("wild", function (data) {
            console.log('wild', data);
            data = JSON.parse(data);
            // case the number of user rquested to send a message grater or equal to the number of client avaliable
            if(data.quantity >= clients.length){
                socket.broadcast.emit("wild", data.message);
            } else {
                let useMap = new Map();
                for(let i = 0; i < data.quantity ; i++){
                    let randomNum = getRandomInt(clients.length);
                    if(useMap.has(randomNum)){
                        randomNum = findNonExsitNumber(useMap, data.quantity);
                    }
                    useMap.set(randomNum, true);
                    io.to(clients[randomNum]).emit("wild",data.message);
                }
            }
        });

        //sends a message to all users
        socket.on("blast", function (data) {
            console.log('blast', data);
            socket.broadcast.emit("blast", data);
        });
    });
}

module.exports = {initListen};
