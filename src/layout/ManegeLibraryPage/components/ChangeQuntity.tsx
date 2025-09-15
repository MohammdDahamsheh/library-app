import { use, useEffect, useState } from "react";
import BookModel from "../../../Models/Book";
import axios from "axios";
import { BookComponent } from "./BookComponent";
import { useAuth0 } from "@auth0/auth0-react";
import BookForUpdate from "../../../Models/BookForUpdate";
import { Pagenation } from "../../searchBooksComponent/Pageation";
import { Spinner } from "../../HomePage/components/spinner";

export const ChangeQuntity = () => {
  const [books, setBooks] = useState<BookForUpdate[]>([]);
  const [isLoding, setIsloding] = useState(true);
  const [httpError, setHttpError] = useState();
  const [totalPage, setTotalPages] = useState(0);
  const [currentPage, setCurrentPages] = useState(1);
  const [totalElemnts, setTotalElements] = useState(0);
  const { isAuthenticated, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    const featchBooks = async () => {
      const respone = await axios.get(
        `http://localhost:8080/api/getBooks?pageNum=${currentPage-1}&pageSize=${5}`
      );
      if (respone.status !== 200) throw Error();
      setBooks(respone.data.content);
      setTotalPages(respone.data.totalPages);
      setTotalElements(respone.data.totalElements);
      setIsloding(false);
    };
    featchBooks().catch((err) => {
      setIsloding(false);
      setHttpError(err.message);
    });
  }, [ currentPage,books]);

  const saveFun = async (book: BookForUpdate) => {
    if (isAuthenticated) {
      const tokenId = await getIdTokenClaims();
      const token = tokenId?.__raw;

      const response = await axios.post(
        `http://localhost:8080/api/secure/updateBook`,
        book,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status !== 200) throw Error();
    }
  };
  const deleteFun = async (book: BookForUpdate) => {
    if (isAuthenticated) {
      const tokenId = await getIdTokenClaims();
      const token = tokenId?.__raw;

      const response = await axios.post(
        `http://localhost:8080/api/secure/deleteBook`,
        book,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status !== 200) throw Error();
    }
  };
  const pegenate=(page:number)=>setCurrentPages(page);

  if(isLoding)return <Spinner/>
  if(httpError)return <>{httpError}</>
  return (
    <div className="container">
      <h5 className="mt-3">{`Number Of Results : (${totalElemnts}) `}</h5>

      {books.length > 0 ? (
        <>
          {books.map((book) => (
            <div key={book.id}>
              <BookComponent
                book={book}
                deleteFun={deleteFun}
                saveFun={saveFun}
              />
            </div>
          ))}
          {totalPage>1 &&<Pagenation currentPage={currentPage} totalPage={totalPage} paginate={pegenate}/>}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
