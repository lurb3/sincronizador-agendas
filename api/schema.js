
let { buildSchema } = require('graphql');

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
    workbook_id: String
}
type Query {
    getUsers : [User],
    getUserInfo(user: String) : User,
    authUser(user: String, password: String) : User,
    getWorkbook(name: String): Workbook,
    getWorkbooks(user_id: String): [Workbook],
    getTasks(workbook_id: String) : [task],
}    
type Mutation {
    updateUserInfo(id: Int, user: String, name: String, password: String) : Boolean
    createUser(user: String, name: String, password: String) : Boolean
    deleteUser(id: Int) : Boolean
    createWorkbook(name: String, date: String, hour:String, timezone: String) : Boolean
    createWorkbookUser(user_id: String, workbook_id: String) : Boolean
    createTask(name: String, description: String, workbook_id: String, status: String) : Boolean
}
`);

module.exports = schema;