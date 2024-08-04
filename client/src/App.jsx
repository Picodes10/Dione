/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Project from "./components/Projects";
import Footer from "./components/Contact"

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Project />} />
        {/* To be fixed Footer */}
        <Route path="/footer" element={<Footer />} />
        {/* Add other routes as necessary */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
 