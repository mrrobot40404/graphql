// Login form handling /signin API request
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../provider/authProvider";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(""); // tracking error messages

  const { setToken } = useAuth(); // Custom useAuth hook allows login to access setToken function

  // handling login request
  // submit username/pass to /login endpoint (backend API)
  // on successful response, jwt is retrieved from response.data.token and stored
  const handleLogin = async (e) => {
    // We don't want the browser to refresh the page by default as that would lose the token
    e.preventDefault();
    setError(""); // clearing previous errors

    // validating inputs
    if (!credentials.username || !credentials.password) {
      setError("Username and password required!");
      return;
    }

    try {
      const response = await axios.post(
        "https://learn.reboot01.com/api/auth/signin",
        credentials
      );
      setToken(response.data.token); // store token in local storage
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError("Unauthorized - invalid username/password");
        } else {
          setError("Unexpected Error");
        }
      } else {
        setError(
          "Unable to connect to the server - check your internet connection"
        );
      }
      console.error("Login failed", error);
    }
  };

  return (
    <div>
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
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
      {/* below is the conditional rendering in React for errors */}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

export default Login;

const styles = {
  button: {
    backgroundColor: "#04AA6D",
    color: "white",
    padding: "15px 32px",
    border: "none",
    // borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    color: "red",
    marginTop: "10px",
    fontSize: "16px",
  },
};
