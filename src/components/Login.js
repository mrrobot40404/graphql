// Login form handling /signin API request
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../provider/authProvider";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { setToken } = useAuth(); // Custom useAuth hook allows login to access setToken function

  // handling login request
  // submit username/pass to /login endpoint (backend API)
  // on successful response, jwt is retrieved from response.data.token and stored
  const handleLogin = async (e) => {
    // We don't want the browser to refresh the page by default as that would lose the token
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://learn.reboot01.com/api/auth/signin",
        credentials
      );
      setToken(response.data.token); // store token in local storage
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={
          (e) => setCredentials({ ...credentials, password: e.target.value }) // spread operator ... ensures existing values in credentials object are preserved
        }
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
