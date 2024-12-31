// Purpose is to configure Apollo Client for managing GraphQL requests - includes the GraphQL endpoint and authentication headers (JWT token)

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: "https://learn.reboot01.com/api/graphql-engine/v1/graphql", // GraphQL server endpoint
});

// Add JWT token from local storage to the authorization header
const authLink = setContext((_, { headers }) => {
    // get token from local storage
    const token = localStorage.getItem("token");
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : "", // Add Bearer Token if available
        },
    };
});

// init appollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink), // combining authhLink with httplink
  cache: new InMemoryCache(), // cache query results after fetching them
});

// Wrap the app with apollo provider to enable graphql in react components
export const GraphQLProvider = ({ children }) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default client;