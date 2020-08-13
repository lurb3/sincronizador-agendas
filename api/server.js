let express = require('express');
let { graphqlHTTP } = require('express-graphql');
let { buildSchema } = require('graphql');
let passwordHash = require('password-hash');
let mysql = require('mysql');
const cors = require('cors');

let schema = buildSchema(`
    type User {
        id: String
        name: String
        username: String
        password: String
    }
    type Query {
        getUsers: [User],
        getUserInfo(id: Int) : User,
    }    
    type Mutation {
        updateUserInfo(id: Int, name: String, username: String, password: String) : Boolean
        createUser(name: String, username: String, password: String) : Boolean
        authUser(username: String, password: String) : Boolean
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
    authUser: (args, req) => {
        queryDB(req, "select * from users")
            .then(data =>{
                data.map((item, index) => {
                    if(passwordHash.verify(args.password, item.password)) {
                        return data;
                    }
                })
                return data;
            })
    },
    getUsers: (args, req) => queryDB(req, "select * from users").then(data => data),
    getUserInfo: (args, req) => queryDB(req, "select * from users where id = ?", [args.id]).then(data => data[0]),
    updateUserInfo: (args, req) => queryDB(req, "update users SET ? where id = ?", [args, args.id]).then(data => data),
    createUser: (args, req) => {
        args.password = passwordHash.generate(args.password)
        queryDB(req, "insert into users SET ?", args).then(data => data)
    },
    deleteUser: (args, req) => queryDB(req, "delete from users where id = ?", [args.id]).then(data => data)
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