import React from "react";
import img from "./../../../Images/BooksImages/book-luv2code-1000.png";
import BookModel from "../../../Models/Book";

export const ReturnBook = (props: { book: BookModel }) => {
  return (
    <div className="col-xs-6 col-sm-8 col-md-3 col-lg-3 mb-3">
      <div className="text-center">
        {props.book.img ? 
          <img src={props.book.img} width="151" height="233" alt="book" />
         : 
          <img src={img} width="151" height="233" alt="book" />
        }
        {/* <img src={img} width="151" height="233" alt="book" /> */}

        <h6 className="mt-2">{props.book.title}</h6>
        <p>{props.book.author}</p>
        <a className="btn main-color text-white" href="#">
          Reserve
        </a>
      </div>
    </div>
  );
};
