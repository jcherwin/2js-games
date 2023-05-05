const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./graphql');
const { connectToDB } = require('./utils/db');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // Add any context that might be needed for resolvers
    },
  });

  server.applyMiddleware({ app });

  await connectToDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();
