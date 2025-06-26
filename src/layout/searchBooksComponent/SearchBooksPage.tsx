import { useEffect, useState } from "react";
import { SearchBooks } from "./SearchBooks";
import React from "react";
import BookModel from "../../Models/Book";
import { Spinner } from "../HomePage/components/spinner";
import { SearchField } from "./SearchFiledComp";
import { Pagenation } from "./Pageation";
import { log } from "console";
export const SearchBooksPage = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoding, setIsloding] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [firstBookIndex, setFirstBookIndex] = useState(0);
  const [lastBookIndex, setLastBookIndex] = useState(5);

  const paginate = (pageNumber: number) => {
    setCurrentPage(() => pageNumber);
    setFirstBookIndex(() => 0 + (pageNumber - 1) * 5);
    const lastBookIndexValue =
      pageNumber === Math.ceil(books.length / 5)
        ? books.length
        : 5 + (pageNumber - 1) * 5;
    setLastBookIndex(() => lastBookIndexValue);
    window.scrollTo(0,0);
  };
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
    return <Spinner />;
  }
  if (httpError) {
    return <div className="container mt-5">{httpError}</div>;
  }

  return (
    <div>
      <div className="container">
        <div>
          <SearchField />

          <div className="mt-3">
            <h5>Number of result : (22)</h5>
            <p>
              {firstBookIndex + 1} to {lastBookIndex} of 22 items
            </p>
          </div>

          {books.slice(firstBookIndex, lastBookIndex).map((book) => (
            <SearchBooks book={book} key={book.id} />
          ))}
          {books.length >= 1 && (
            <Pagenation
              currentPage={currentPage}
              totalPage={Math.ceil(books.length / 5)}
              paginate={paginate}
            />
          )}
        </div>
      </div>
    </div>
  );
};
