let express = require('express'),
    jwt     = require('jsonwebtoken'),
    db      = require('../config/db');

let app = express.Router();

function createToken(user) {
  delete user.password;
  return jwt.sign(user, process.env.SECRET, { expiresIn: "10h"});
}

function getUserDB(email, done) {
  db.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email], function(err, rows, fields) {
    if (err) throw err;
    done(rows[0]);
  });
}

app.post('/register', function(req, res) {  
  if (!req.body.username || !req.body.password || !req.body.email ) {
    return res.status(400).send("You must send the email and the password");
  }

  getUserDB(req.body.username, function(user){
    if(!user) {
      user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email      
      };
      db.query('INSERT INTO users SET ?', [user], function(err, result){
        if (err) throw err;
        newUser = {
          username: user.username,
          password: user.password,
          email: user.email,
        };
        res.status(201).send({
          token: createToken(newUser)
        });
      });
    }
    else res.status(400).send("A user with that email already exists");
  });
});

app.post('/login', function(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send("You must send the email and the password");
  }

  getUserDB(req.body.email, function(user){
    if (!user) {
      return res.status(401).send("The user email not existing");
    }

    if (user.password !== req.body.password) {
      return res.status(401).send("password don't match");
    }

    user = JSON.parse(JSON.stringify(user))
    res.status(201).send({
      token: createToken(user)
    });
  });
});



module.exports = app