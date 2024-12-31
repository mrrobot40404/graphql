// A component to query and display user information using GraphQL

// Executes graphql queries and displays the data fetched from the server

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "../graphql/queries";

const Profile = () => {
  const { loading, error, data } = useQuery(GET_USER_PROFILE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // extracting user data
  const user = data.user[0];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome, {user.login}!</h1>
      <div className="dashboard-card">
        <h2> User Profile</h2>
        <p>
          <strong>Campus:</strong> {user.campus}
        </p>
        <p>
          <strong>Joined:</strong>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Profile;
