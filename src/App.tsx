/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./App.css";
import { Navbar } from "./layout/navbarAndFooter/Navbar";
import { Footer } from "./layout/navbarAndFooter/footer";
import { HomePage } from "./layout/HomePage/Homepage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <HomePage/>
      <Footer/>
    </div>
  );
}

export default App;
