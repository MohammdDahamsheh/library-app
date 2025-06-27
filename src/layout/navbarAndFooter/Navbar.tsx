/* eslint-disable jsx-a11y/anchor-is-valid */

import { Navigate, NavLink, useNavigate } from "react-router-dom";

export const Navbar = () => {

  const navigate=useNavigate();

  return (
    <nav className="navbar navbar-dark main-color py-2">
      <div className="container-fluid">
        <span className="navbar-brand">Library App</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span> 
         </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to={'/home'} >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='/search'>
                Search Book
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item m-1">
              <a type="button" className="btn btn-outline-light" href="#">
                sign up
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
