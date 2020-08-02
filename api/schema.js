const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID!
        username: String
    }

    type Query {
        users: User
    }
`;

module.exports = typeDefs;