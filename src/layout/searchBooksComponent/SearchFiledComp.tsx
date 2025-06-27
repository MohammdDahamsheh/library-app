import React, { useState } from "react";
import BookModel from "../../Models/Book";
export const SearchField = (props:{findBookByTitle:any,findBookByCategory:any}) => {
  const[inputVal,setInputVal]=useState<string>("");
  const[categorySelection,setCategorySelection]=useState<string>("Book Category");
  return (
    <div className=" row mt-5">
      <div className="col-6">
        <div className="d-flex">
          <input
            type="search"
            placeholder="Search"
            className=" form-control me-2"
            aria-label="Search"
            onChange={(e)=>setInputVal(e.target.value)}
          />
          <button className="btn  btn-outline-success" onClick={()=>props.findBookByTitle(inputVal)}>search</button>
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
            {categorySelection}
          </button>
          <ul className="dropdown-menu">
            <li onClick={()=>{setCategorySelection("ALL");props.findBookByCategory("All")}}>
              <a href="#" className="dropdown-item">
                All
              </a>
            </li>
            <li onClick={()=>{setCategorySelection("Front End");props.findBookByCategory("FE")}}>
              <a href="#" className="dropdown-item">
                Front End
              </a>
            </li>
            <li onClick={()=>{setCategorySelection("Back End");props.findBookByCategory("BE")}}>
              <a href="#" className="dropdown-item">
                Back End
              </a>
            </li>
            <li onClick={()=>{setCategorySelection("Data");props.findBookByCategory("Data")}}>
              <a href="#" className="dropdown-item">
                Data
              </a>
            </li>
            <li onClick={()=>{setCategorySelection("DevOps");props.findBookByCategory("DevOps")}}>
              <a href="#" className="dropdown-item">
                DevOps
              </a>
            </li>
          </ul>
        </div>
      
      </div>
    </div>
  );
};
