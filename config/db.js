require('dotenv').config()

const mysql = require('mysql')

// Create Connection
const db = mysql.createPool({
    host : process.env.USER,
    user :  process.env.USER, 
    password :  process.env.PASSWORD,
    database :  process.env.DATABASE,
})


module.exports = db