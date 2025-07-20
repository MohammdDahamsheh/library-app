import { useEffect, useState } from "react";
import BookModel from "../../Models/Book";
import axios from "axios";
import { Spinner } from "../HomePage/components/spinner";
import img from "../../Images/BooksImages/book-luv2code-1000.png";
import { StarRait } from "./StarRaitComponent";
import { BookCheckoutComponent } from "./checkoutComponent";
import Review from "../../Models/Review";
import { ReviewSection } from "./ReviewSection";
import { useAuth0 } from "@auth0/auth0-react";
export const BookCheckoutPage = () => {
  // const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { isAuthenticated, getIdTokenClaims } = useAuth0();

  //Book state
  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const bookId = window.location.pathname.split("/")[2];

  //Review State:
  const [review, setReview] = useState<Review[]>([]);
  const [isLoadingReview, setIsLoadingReview] = useState(true);
  const [totalStar, setTotalStar] = useState<number>(0);
  const [isLeftReview, setIsLeftReview] = useState(false);
  const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);

  //featch the review for the book by book id from the backend
  useEffect(() => {
    const feachReview = async () => {
      const URL = `http://localhost:8080/api/review/${bookId}`;
      const response = await axios.get(URL);
      // console.log(response);
      if (response.status !== 200) {
        throw new Error();
      }
      // console.log(response);

      const responseData = await response.data;
      const reviewData: Review[] = [];
      let countOfRating: number = 0;
      console.log(responseData);

      for (let key in responseData) {
        reviewData.push({
          id: responseData[key].id,
          userEmail: responseData[key].userEmail,
          date: responseData[key].date,
          rating: responseData[key].rating,
          bookId: responseData[key].bookId,
          reviewDescription: responseData[key].reviewDescription,
        });
        countOfRating = countOfRating + responseData[key].rating;
      }

      setReview(() => reviewData);
      setIsLoadingReview(false);
      if (countOfRating) {
        const rait = (
          Math.round((countOfRating / reviewData.length) * 2) / 2
        ).toFixed(1);
        setTotalStar(Number(rait));
      }
    };
    feachReview().catch((error) => {
      setHttpError(() => error.message);
      setIsLoadingReview(false);
    });
  }, [bookId, isLeftReview]);

  //featch the Book form the backend :
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
  }, [bookId, book]);

  const handleCheckoutButton = async () => {
    //To get the object that have all info
    const tokenId = await getIdTokenClaims();
    // (tokenId?.__raw : is the token in the obgect info)
    const token = tokenId?.__raw;
    // console.log(token?.__raw);

    //to make an requset with send the token
    const response = await axios.put(
      `http://localhost:8080/api/secure/checkout?bookId=${bookId}`,
      {
        /*Requst (put) body*/
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw Error();
    }

    const responseData = await response.data;
    // console.log(responseData);

    setBook(responseData);
  };

  useEffect(() => {
    const fetchReview = async () => {
      if (isAuthenticated) {
        const url = `http://localhost:8080/api/secure/checkReviewTheBookByUser?bookId=${bookId}`;
        const getToken = await getIdTokenClaims();
        const token = getToken?.__raw;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status !== 200) {
          throw Error("There is some wronge....");
        }
        const responseData = await response.data;
        // console.log(`******* ${responseData}`);

        setIsLeftReview(responseData);
      }
      setIsLoadingUserReview(false);
    };
    fetchReview().catch((err: any) => {
      setIsLoadingUserReview(false);
      setHttpError(err.message);
    });
  }, [bookId, getIdTokenClaims, isAuthenticated]);

  if (isLoading || isLoadingReview || isLoadingUserReview) {
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

              <StarRait rait={totalStar} size={32} />
            </div>
          </div>

          <BookCheckoutComponent
            book={book}
            mobile={false}
            handleCheckoutBook={handleCheckoutButton}
            isLeftReview={isLeftReview}
            onReview={() => setIsLeftReview(true)}
          />
        </div>
        <hr />
        <ReviewSection review={review} mobile={false} bookId={Number(bookId)} />
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
        <StarRait rait={totalStar} size={32} />
        <BookCheckoutComponent
          book={book}
          mobile={true}
          handleCheckoutBook={handleCheckoutButton}
          isLeftReview={isLeftReview}
          onReview={() => setIsLeftReview(true)}
        />
        <hr />
        <ReviewSection review={review} mobile={true} bookId={Number(bookId)} />
      </div>
    </div>
  );
};
