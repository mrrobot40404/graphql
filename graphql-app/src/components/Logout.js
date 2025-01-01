// button to handle clearing the JSON Web Token and redirecting to the login page

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const LogoutButton = () => {
  const { logout } = useAuth(); // access logout function from  auth provider
  const navigate = useNavigate(); // React router navigation hook

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <button onClick={handleLogout} style={styles.button}>
      Logout
    </button>
  );
};

export default LogoutButton;

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
};
