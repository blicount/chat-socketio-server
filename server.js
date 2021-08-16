const express = require("express");
const app = express();
const dotenv = require("dotenv");
const server = require("http").createServer(app);
const cors = require("cors");
const chat = require('./controllers/chat');

//CORS
app.use(cors());
app.use(express.urlencoded({extended: true}));

//initilize socket connection
chat.initListen(server);

//Routes
app.get('/', (req, res) => {
    res.send('wellcom to chat api please excute the rquested command');
});
app.use("/user", require("./routes/user"));

// Port
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log("Server started on port", PORT));

module.exports = app;