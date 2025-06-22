/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './App.css';
import { Navbar } from './layout/navbarAndFooter/Navbar';
import { ExploerTopBooks } from './layout/HomePage/ExploerTopBooks';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <ExploerTopBooks/>
    </div>
  );
}

export default App;
