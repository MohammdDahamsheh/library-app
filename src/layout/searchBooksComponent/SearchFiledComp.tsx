import React from "react";
import BookModel from "../../Models/Book";
export const SearchField = () => {
  return (
    <div className=" row mt-5">
      <div className="col-6">
        <div className="d-flex">
          <input
            type="search"
            placeholder="Search"
            className=" form-control me-2"
            aria-label="Search"
          />
          <button className="btn  btn-outline-success">search</button>
        </div>
      </div>
      <div className="col-4">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
            id="selectCategoryButtuon1"
            type="button"
          >
            Book category
          </button>
          <ul className="dropdown-menu">
            <li>
              <a href="#" className="dropdown-item">
                1
              </a>
            </li>
            <li>
              <a href="#" className="dropdown-item">
                2
              </a>
            </li>
            <li>
              <a href="#" className="dropdown-item">
                3
              </a>
            </li>
            <li>
              <a href="#" className="dropdown-item">
                4
              </a>
            </li>
          </ul>
        </div>
      
      </div>
    </div>
  );
};
