import React from "react";
import BookModel from "../../Models/Book";
import { Link } from "react-router-dom";

export const SearchBooks = (props: { book: BookModel }) => {
  return (
    <div className="card shadow p-3 mt-3 bg-body rounded">
      <div className="row g-0">
        {/* 
        img space 
        */}

        <div className="col-md-3">
          <div className="d-none d-lg-block">
            {props.book.img ? (
              <img src={props.book.img} alt="none" width="123" height="196" />
            ) : (
              <img
                src={"../../../Images/BooksImgaes/book-luv2code-1000.png"}
                alt="none"
                width="123"
                height="196"
              />
            )}
          </div>

          <div className="d-lg-none d-flex justify-content-center align-items-center">
            {props.book.img ? (
              <img src={props.book.img} alt="none" width="123" height="196" />
            ) : (
              <img
                src={"../../../Images/BooksImgaes/book-luv2code-1000.png"}
                alt="none"
                width="123"
                height="196"
              />
            )}
          </div>
        </div>

        {/* 
       text space 
       */}

        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">{props.book.author}</h5>
            <h4>{props.book.title}</h4>
            <p className="card-text">{props.book.decription}</p>
          </div>
        </div>

        {/* 
        buttom space
         */}

        <div className="col-md-3 d-flex justify-content-center align-items-center">
          <Link to={`/checkout/${props.book.id}`} className="btn btn-md main-color text-white">
            view Details
          </Link>
        </div>
      </div>
    </div>
  );
};
