import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createClient } from 'graphql-ws';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import AuthService from './utils/auth';

const LOCAL_URL = 'ws://localhost:3001/graphql';
const DEPLOY_URL = 'wss://jjs-games.herokuapp.com/graphql';

const httpLink = new HttpLink({
    uri: '/graphql', // your server GraphQL endpoint
});

const wsLink = new GraphQLWsLink(createClient({
    url: DEPLOY_URL,
    connectionParams: {
        authToken: AuthService.getToken(),
    },
}));

const authLink = setContext((_, { headers }) => {
    // get the token from AuthService
    const token = AuthService.getToken();
    // return the headers with the token included
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    authLink.concat(httpLink),
);

const cache = new InMemoryCache({
    typePolicies: {
        Game: {
            fields: {
                players: {
                    merge(existing = [], incoming) {
                        return incoming;
                    },
                },
            },
        },
    },
});

const client = new ApolloClient({
    link: splitLink,
    cache: cache,
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
