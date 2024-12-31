// Main entry point, rendering the App component into the root DOM element

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./provider/authProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <AuthProvider>
        <App />
    </AuthProvider>
);