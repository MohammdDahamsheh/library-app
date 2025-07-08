import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export const LibraryService = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="container my-5">
      <div className="row p-2 align-items-center border shadow-lg">
        <div className="col-7 p-3">
          <h2>Can't find what you are looking for ?</h2>
          <p className="lead fs-sm">
            if you can not find what you are looking for ,send our library
            admin's personal messege!
          </p>

          <div className="d-grid gap-2 justify-content-start mb-4 mb-lg-3">
            {isAuthenticated ? (
              <Link to={"/search"} className="btn btn-md main-color text-white">
                Search
              </Link>
            ) : (
              <Link to={"/login"} className="btn btn-md main-color text-white">
                sgin up
              </Link>
            )}
          </div>
        </div>
        <div className="lost-image col-lg-4 offset-lg-1 shadow-lg"></div>
      </div>
    </div>
  );
};
