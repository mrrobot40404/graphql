// Root component of the App - managing routing and overall layout

import React from "react";
import Login from "./components/Login";
import Profile from "./components/Profile";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/profile" element={<Profile />}/>
            </Routes>
        </Router>
    );
};

export default App;