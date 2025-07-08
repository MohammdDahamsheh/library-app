import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export function ExploerTopBooks() {
    const { isAuthenticated } = useAuth0();

  return (
    <header className="header bg-dark p-5 mb-4">
      <div className="container-fluid py-3 text-white d-flex justify-content-center align-items-center">
        <div>
          <h1 className="fw-bold display-5">Find your next advenure</h1>
          <div className="fs-4 col-md-8">where wolud you like go next</div>
          {!isAuthenticated?
            <Link className="btn main-color text-light btn-md" to={"/login"}>
            Sign up
          </Link>
          :
          <Link className="btn main-color text-light btn-md" to={"/search"}>
            Exploer top books
          </Link>}
        </div>
      </div>
    </header>
  );
}
