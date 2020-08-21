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
        hour: String
        timezone: String
    }
    type task {
        id: String
        name: String
        description: String
        user_id: String
        workbook_id: String
    }
    type Query {
        getUsers : [User],
        getUserInfo(user: String) : User,
        authUser(user: String, password: String) : User,
        getWorkbook(name: String): Workbook,
        getWorkbooks(user_id: String): [Workbook],
        getTasks : [task],
    }    
    type Mutation {
        updateUserInfo(id: Int, user: String, name: String, password: String) : Boolean
        createUser(user: String, name: String, password: String) : Boolean
        deleteUser(id: Int) : Boolean
        createWorkbook(name: String, date: String, hour:String, timezone: String) : Boolean
        createWorkbookUser(user_id: String, workbook_id: String) : Boolean
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
        queryDB(req, "select user from users where user = ?", [args.user]).then(data => {
            if(data == '') {
                args.password = passwordHash.generate(args.password);
                queryDB(req, "insert into users set ?", args).then(data => data)
            } else {
                return {data}
            }
        })

        //queryDB(req, "insert into users SET ?", args).then(data => data)
    },
    deleteUser: (args, req) => queryDB(req, "delete from users where id = ?", [args.id]).then(data => data),

    //Workbooks
    getWorkbook: (args, req) => queryDB(req, "select id from workbooks where name = ?", args.name).then(data=>data[0]),
    getWorkbooks: (args, req) => queryDB(req, "select * from workbooks INNER JOIN user_workbooks ON workbooks.id = user_workbooks.workbook_id AND user_workbooks.user_id = ?", [args.user_id]).then(data => data),
    createWorkbook: (args, req) => {
        queryDB(req, "insert into workbooks set ?", args).then(data => data)
    },
    createWorkbookUser: (args, req) => {
        queryDB(req, "insert into user_workbooks set ?", args).then(data => console.log(data))
    },

    //Tasks
    getTasks: (args, req) => queryDB(req, "select * from tasks").then(data => data),
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