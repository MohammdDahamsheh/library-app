import { useEffect, useState } from "react";
import BookModel from "../../Models/Book";
import axios from "axios";
import { Spinner } from "../HomePage/components/spinner";
import img from "../../Images/BooksImages/book-luv2code-1000.png";
import { StarRait } from "./StarRaitComponent";
import { BookCheckoutComponent } from "./checkoutComponent";
export const BookCheckoutPage = () => {
  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const bookId = window.location.pathname.split("/")[2];

  useEffect(() => {
    const feachBook = async () => {
      const url: string = `http://localhost:8080/api/books/${bookId}`;

      const response = await axios.get(url);
      if (response.status !== 200) {
        throw new Error();
      }
      const responseData = await response.data;
      const loadBook: BookModel = {
        id: responseData["id"],
        category: responseData["category"],
        author: responseData["author"],
        copies: responseData["copies"],
        decription: responseData["description"],
        copies_avilavle: responseData["copiesAvailable"],
        title: responseData["title"],
        img: responseData["img"],
      };
      setBook(loadBook);
      setIsLoading(false);
    };
    feachBook().catch((error: any) => {
      setHttpError(error.message);
      setIsLoading(false);
    });
  }, [bookId]);
  if (isLoading) {
    return (
      // < div className="container mt-5">
      //   Loading...
      // </div>

      <Spinner />
    );
  }
  if (httpError) {
    return <div className="container mt-5">{httpError}</div>;
  }
  return (
    <div>
      <div className="container d-none d-lg-block ">
        <div className="row  mt-5">
          <div className="col-sm-2 col-md-2 me-5">
            <img
              src={book?.img ? book.img : img}
              alt="book"
              width="226"
              height="349"
            />
          </div>
          <div className="col-md-5 col-sm-4 container">
            <div className="ms-5">
              <h3>{book?.title}</h3>
              <h5 className="text-primary">{book?.author}</h5>
              <p className="lead overflow-auto fs-6" style={{ maxHeight: 250 }}>
                {book?.decription}
              </p>

              <StarRait rait={2.5} size={32} />
            </div>
          </div>

          <BookCheckoutComponent book={book} mobile={false} />
        </div>
        <hr />
      </div>
      {/* MOBILE */}
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center algin-items-center">
          <img
            src={book?.img ? book.img : img}
            alt="book"
            className=""
            width="226"
            height="349"
          />
        </div>
        <div className="mt-5">
          <div className="ml-2">
            <h3>{book?.title}</h3>
            <h5 className="text-primary">{book?.author}</h5>
            <p className="lead overflow-auto" style={{ maxHeight: 250 }}>
              {book?.decription}
            </p>
          </div>
        </div>
        <StarRait rait={4.5} size={32} />
        <BookCheckoutComponent book={book} mobile={true} />
      </div>
    </div>
  );
};
