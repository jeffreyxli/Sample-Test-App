const express = require('express');
const cors = require('cors');
const graphqlHTTP  = require('express-graphql');
const { buildASTSchema } = require('graphql');;
const gqlTag = require('graphql-tag');
const { startDatabase } = require("../database");

const users = [
    { username: "John Smith", age: 43, email: "John123@gmail.com" },
    { username: "Jane Smith", age: 42, email: "janetest@gmail.com" },
    { username: "Bobby Smith", age: 15, email: "bobby88@aol.com" },
];

const context = async () => {
    const db = await startDatabase();
  
    return { db };
  };
  
const schema = buildASTSchema(gqlTag`
    type Query {
        users: [User]
        user(id: ID!): User
    }

    type User {
        id: ID
        username: String
        age: Int
        email: String
    }

    type Mutation {
        createUser(input: UserInput!): User
      }
      
    input UserInput {
        id: ID
        username: String!
        age: Int!
        email: String!
    }
`);

const mapUsers = (user, id) => user && ({ id, ...user });

const root = {
    users: () => users.map(mapUsers),
    user: ({ id }) => mapUsers(users[id], id),
    createUser: ({ input: { id, username, age, email } }) => {
        const newUser = { username, age, email };
        let index = users.length;
      
        if (id != null && id >= 0 && id < users.length) {
            if (users[id].userId !== userId) return null;
      
            users.splice(id, 1, newUser);
            index = id;
        } 
        else {
            users.push(newUser);
        }
      
        return mapUsers(newUser, index);
    },
};

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
    context
}));

app.listen(4000, () => {
    console.log("Listening on port 4000");
});

app.use('/', (req, res) => {
    res.send("Root Endpoint");
});

module.exports = app;