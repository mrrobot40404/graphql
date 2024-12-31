// Purpose is to configure Apollo Client for managing GraphQL requests - includes the GraphQL endpoint and authentication headers (JWT token)

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client";

const client = new ApolloClient({
    uri: '',
    cache: new InMemoryCache(),
});