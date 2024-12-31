// Stores GraphQL queries and mutations for easy reuse

import { gql } from "@apollo/client";

// query to fetch user data
export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    user {
      login
      campus
      createdAt
    }
  }
`;
