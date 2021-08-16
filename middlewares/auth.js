const jwt = require("jsonwebtoken");

const routeAuth =  async function(req, res, next){
  try {
    if (!req.headers.authorization) throw "Forbidden!!";
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.SECRET);
    req.payload = payload;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Forbidden 🚫🚫🚫",
    });
  }
};

const socketAuth = function(socket, next){
  console.log(socket.handshake.query.token);
  if (socket.handshake.query && socket.handshake.query.token){
    try{
      let payload = jwt.verify(socket.handshake.query.token, process.env.SECRET) 
      socket.decoded = payload;
      next(); 
    } catch(err){
      next(new Error(err));
    } 
  } else {
    next(new Error('Authentication error'));
  }    
}
module.exports = {socketAuth, routeAuth};