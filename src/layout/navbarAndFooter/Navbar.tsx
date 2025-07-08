/* eslint-disable jsx-a11y/anchor-is-valid */

import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
export const Navbar = () => {
  // const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const handleLogout = () => {
    console.log("handleLogout");
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const handleLogin = () => {
    loginWithRedirect();
    window.location.assign("/");
  };
  console.log("isAuthenticated: ", isAuthenticated);

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
              <NavLink className="nav-link" to={"/home"}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/search">
                Search Book
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item m-1">
              {!isAuthenticated ? (
                <button className="btn btn-outline-light" onClick={handleLogin}>
                  Sign in
                </button>
              ) : (
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};


