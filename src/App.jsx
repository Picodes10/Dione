/* eslint-disable no-unused-vars */
import React from "react";

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from "./components/Home";
import Projects from './components/Projects';
import MyTimeline from './components/Feed';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Home />
      <Projects />
      <MyTimeline />
      <Footer />
    </>
  );
};

export default App;
