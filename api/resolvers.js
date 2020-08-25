const { query } = require('express');
const queryDB = (req, sql, args) => new Promise((resolve, reject) => {
    req.mysqlDb.query(sql, args, (err, rows) => {
        if (err)
            return reject(err);
        rows.changedRows || rows.affectedRows || rows.insertId ? resolve(true) : resolve(rows);
    });
});

function getUsers(args, req) { 
    queryDB(req, "select id, user, role from users").then(data => data)
}

function authUser (args, req) {
    queryDB(req, "select * from users where user = ?", [args.user]).then(data => {
        if(data == ''){
            return {status: "User does not exists"};
        }

        let verifyPassword = passwordHash.verify(args.password, data[0].password);

        if (verifyPassword) {
            console.log(data)
            return {status: "authenticated", role: data[0].role}
        } else {
            return {status: "Wrong Password"}
        }
    })
}

module.exports = {getUsers, authUser};