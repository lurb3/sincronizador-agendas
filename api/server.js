const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { models, db } = require('./db')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context() {
        return { models, db }
    }
})

console.log(models.User.findAll())

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})

/*
const express = require('express')
const port = 3000;
const app = express();

app.get('/', (req, res) => { 
    res.send('I am here'); console.log("sending")
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
*/