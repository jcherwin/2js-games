const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');
const express = require('express');
const {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');

const { connectToDB } = require('./utils/db');
const { typeDefs, resolvers } = require('./graphql');
const { authMiddleware } = require('./utils/auth');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const app = express();
    // app.use(express.urlencoded({ extended: false }));
    // app.use(express.json());
    const httpServer = createServer(app);

    // Creating the WebSocket server
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql',
    });

    // Hand in the schema we just created and have the WebSocketServer start listening.
    const serverCleanup = useServer({ schema }, wsServer);

    const server = new ApolloServer({
        schema,
        context: authMiddleware,
        csrfPrevention: true,
        cache: "bounded",
        plugins: [
            // Proper shutdown for the HTTP server.      
            ApolloServerPluginDrainHttpServer({ httpServer }),      
            // Proper shutdown for the WebSocket server.      
            {      
              async serverWillStart() {      
                return {      
                  async drainServer() {      
                    await serverCleanup.dispose();      
                  },      
                };      
              },      
            },      
            ApolloServerPluginLandingPageLocalDefault({ embed: true }),      
          ],
    });

    await server.start();
    server.applyMiddleware({ app });

    // if (process.env.NODE_ENV === 'production') {
    //     app.use(express.static(path.join(__dirname, '../client/build')));
    // }

    // app.get('/', (req, res) => {
    //     res.sendFile(path.join(__dirname, '../client/build/index.html'));
    // });    

    await connectToDB();

    // app.listen(PORT, () => {
    //     console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    // });

    httpServer.listen(PORT, () => {
        console.log(
          `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
        );
        console.log(
          `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
        );
      });
};

startServer();
