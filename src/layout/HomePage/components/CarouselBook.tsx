import BookModel from "../../../Models/Book";
import { ReturnBook } from "./ReturnBook";
import React, { useEffect, useState } from "react";
import { Spinner } from "./spinner";
import { Link } from "react-router-dom";
export const CarouselBook = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoding, setIsloding] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const feachBooks = async () => {
      const BaseURL: string = "http://localhost:8080/api/books";

      const URL: string = `${BaseURL}`;

      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error("There is some wronge");
      }
      const responseData = await response.json();

      const loadBooks: BookModel[] = [];

      for (const key in responseData) {
        loadBooks.push({
          id: responseData[key].id,
          title: responseData[key].title,
          author: responseData[key].author,
          decription: responseData[key].description,
          copies: responseData[key].copies,
          copies_avilavle: responseData[key].copiesAvailable,
          category: responseData[key].category,
          img: responseData[key].img,
        });
      }
      setBooks(loadBooks);
      setIsloding(false);
    };

    feachBooks().catch((error: any) => {
      setIsloding(() => false);
      setHttpError(error.message);
    });
  });

  if (isLoding) {
    return (
      // < div className="container mt-5">
      //   Loading...
      // </div>

      <Spinner/>
    );
  }
  if (httpError) {
    return <div className="container mt-5">{httpError}</div>;
  }
  return (
    <div className=" mt-5 " style={{ height: 450 }}>
      <div className="homepage-carousel-title">
        <h3>Find your next "I stayed up too late reading" book.</h3>
      </div>
      <div
        id="carouselExampleControls"
        className="carousel carousel-dark slide mt-5 
                 d-lg-block"
        data-bs-interval="false"
      >
        {/* Desktop */}
        <div className="carousel-inner ">
          <div className="carousel-item active px-3">
            <div className="row d-flex justify-content-center align-items-center">
              {/* <ReturnBook />
              <ReturnBook />
              <ReturnBook /> */}
              {/* 
              
              To itrate over the first 3 element in the array 
              */}
              {books.slice(0, 3).map((ele) => (
                <ReturnBook book={ele} key={ele.id} />
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {/* <ReturnBook />
              <ReturnBook />
              <ReturnBook /> */}

              {books.slice(3, 6).map((ele) => (
                <ReturnBook book={ele} key={ele.id} />
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {/* <ReturnBook />
              <ReturnBook />
              <ReturnBook /> */}

              {books.slice(6, 9).map((ele) => (
                <ReturnBook book={ele} key={ele.id} />
              ))}
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Mobile */}
      <div className="d-md-none mt-3">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="text-center">
            <img
              src={"./../../../Images/BooksImages/book-luv2code-1000.png"}
              width="151"
              height="233"
              alt="book"
            />
            <h6 className="mt-2">Book</h6>
            <p>Luv2Code</p>
            <a className="btn main-color text-white" href="#">
              Reserve
            </a>
          </div>
        </div>
      </div>
      <div className="homepage-carousel-title mt-3">
        <Link className="btn btn-outline-secondary btn-lg" to={"/search"}>
          View More
        </Link>
      </div>
    </div>
  );
};
