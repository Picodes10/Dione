/* eslint-disable no-unused-vars */
import React from "react";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Project from "./components/Projects";
import Footer from "./components/Contact"

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <Project />
      <Footer />
    </div>
  );
};

export default App;
 