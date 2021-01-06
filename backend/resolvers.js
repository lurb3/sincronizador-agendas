const { query } = require('express');
const queryDB = (req, sql, args) => new Promise((resolve, reject) => {
    req.mysqlDb.query(sql, args, (err, rows) => {
        if (err)
            return reject(err);
        rows.changedRows || rows.affectedRows || rows.insertId ? resolve(true) : resolve(rows);
    });
});
module.exports = {
    getUsers: (args, req) => queryDB(req, "select id, user, role from users").then(data => data),
    authUser: (args, req) => queryDB(req, "select * from users where user = ?", [args.user]).then(data => {
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
    }),
    getUserId: (args, req) => queryDB(req, "select id from users where user = ?"),
    getUserInfo: (args, req) => queryDB(req, "select * from users where user = ?", [args.user]).then(data => data[0]),
    updateUserInfo: (args, req) => queryDB(req, "update users SET ? where id = ?", [args, args.id]).then(data => data),
    createUser: (args, req) => {
        console.log(args)
        queryDB(req, "select user from users where user = ?", [args.user]).then(data => {
            if(data == '') {
                args.password = passwordHash.generate(args.password);
                queryDB(req, "insert into users set ?", args).then(data => data)
            } else {
                return "LASODASD"
            }
        })
    },
    deleteUser: (args, req) => queryDB(req, "delete from users where id = ?", [args.id]).then(data => data),

    //Workbooks
    getWorkbook: (args, req) => queryDB(req, "select id from workbooks where name = ?", args.name).then(data=>data[0]),
    getWorkbooks: (args, req) => queryDB(req, "select workbooks.id, date, hour, name, timezone from workbooks INNER JOIN user_workbooks ON workbooks.id = user_workbooks.workbook_id AND user_workbooks.user_id = ?", [args.user_id]).then(data => data),
    createWorkbook: (args, req) => {
        queryDB(req, "insert into workbooks set ?", args).then(data => data)
    },
    createWorkbookUser: (args, req) => {
        queryDB(req, "insert into user_workbooks set ?", args).then(data => data)
    },

    //Tasks
    getTasks: (args, req) => queryDB(req, "select * from tasks where workbook_id = ?", args.workbook_id).then(data => data),
    createTask: (args, req) => {
        queryDB(req, "insert into tasks set ?", args).then(data => console.log(data))
    },
}