const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    # Define your queries here
  }

  type Mutation {
    # Define your mutations here
  }

  type Subscription {
    # Define your subscriptions here
  }

  # Define your types here
`;

module.exports = typeDefs;
