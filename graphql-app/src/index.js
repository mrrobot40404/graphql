// Main entry point, rendering the App component into the root DOM element

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./provider/authProvider";
import { GraphQLProvider } from "./graphql/client";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <GraphQLProvider>
      {/* to connect apollo client with our app, we wrap it with the graphql provider */}
      <App />
    </GraphQLProvider>
  </AuthProvider>
);
