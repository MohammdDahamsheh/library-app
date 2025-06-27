/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./App.css";
import { Navbar } from "./layout/navbarAndFooter/Navbar";
import { Footer } from "./layout/navbarAndFooter/footer";
import { HomePage } from "./layout/HomePage/Homepage";
import { SearchBooksPage } from "./layout/searchBooksComponent/SearchBooksPage";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1">
        <Navbar />
        {/* <SearchBooksPage/> */}
        {/* <HomePage /> */}
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="search" element={<SearchBooksPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
