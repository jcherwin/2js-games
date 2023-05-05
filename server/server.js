const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./graphql');
const { connectToDB } = require('./utils/db');
const { authMiddleware } = require('./utils/auth');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    const app = express();
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: authMiddleware
    });
    server.applyMiddleware({ app });

    // if (process.env.NODE_ENV === 'production') {
    //     app.use(express.static(path.join(__dirname, '../client/build')));
    // }

    // app.get('/', (req, res) => {
    //     res.sendFile(path.join(__dirname, '../client/build/index.html'));
    // });    

    await connectToDB();

    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
};

startServer();
