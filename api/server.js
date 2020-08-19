let express = require('express');
let { graphqlHTTP } = require('express-graphql');
let { buildSchema } = require('graphql');
let passwordHash = require('password-hash');
let mysql = require('mysql');
const cors = require('cors');
const { query } = require('express');

let schema = buildSchema(`
    type User {
        id: String
        user: String
        name: String
        password: String
        status: String
        role: String
    }
    type Workbook {
        id: String
        name: String
        date: String
        timezone: String
    }
    type Query {
        getUserInfo(user: String) : User,
        authUser(user: String, password: String) : User
        getWorkbooks(user_id: String): [Workbook],
    }    
    type Mutation {
        updateUserInfo(id: Int, user: String, name: String, password: String) : Boolean
        createUser(user: String, name: String, password: String) : Boolean
        deleteUser(id: Int) : Boolean
    }
`);

const queryDB = (req, sql, args) => new Promise((resolve, reject) => {
    req.mysqlDb.query(sql, args, (err, rows) => {
        if (err)
            return reject(err);
        rows.changedRows || rows.affectedRows || rows.insertId ? resolve(true) : resolve(rows);
    });
});

const root = {
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
        queryDB(req, "select user from users where user = ?", [args.user]).then(data => {
            if(data == '') {
                args.password = passwordHash.generate(args.password);
                queryDB(req, "insert into users SET ?", args).then(data => data)
            } else {
                return {data}
            }
        })

        //queryDB(req, "insert into users SET ?", args).then(data => data)
    },
    deleteUser: (args, req) => queryDB(req, "delete from users where id = ?", [args.id]).then(data => data),
    getWorkbooks: (args, req) => queryDB(req, "SELECT * FROM workbooks INNER JOIN user_workbooks ON workbooks.id = user_workbooks.workbook_id AND user_workbooks.user_id = ?", [args.user_id]).then(data => data),
};

let app = express();
app.use(cors())

app.use((req, res, next) => {
    req.mysqlDb = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'test'
    });
    req.mysqlDb.connect();
    next();
  });

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');

/*
const express = require('express')
const port = 3000;
const app = express();

app.get('/', (req, res) => { 
    res.send('I am here'); console.log("sending")
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
*/