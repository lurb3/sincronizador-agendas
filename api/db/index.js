const mysql = require('mysql'); 
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'test'
  });

const createUserModel = require('./user');

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = {
    models: {
        User: createUserModel(con)
    },
    con
}