import { Link } from "react-router-dom";
import BookModel from "../../Models/Book";
import { useAuth0 } from "@auth0/auth0-react";
import {  useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "../HomePage/components/spinner";
import { StarRait } from "./StarRaitComponent";
import ReviewTheBook from "../../Models/ReviewTheBook";

export const BookCheckoutComponent = (props: {
  book: BookModel | undefined;
  mobile: boolean;
  handleCheckoutBook: any;
  isLeftReview: boolean;
  onReview: any;
}) => {
  const [numOfCheckout, setNumOfCheckout] = useState<number>(5);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState<boolean>(false);
  const [httpError, setHttpError] = useState("");

  //put the descreption of the book
  const [description, setDescription] = useState<string>("");
  //put the rating of the book
  const [rating, setRating] = useState(0);
  //to knew if the user put a rate or not
  const [putRating, setPutRating] = useState(false);

  const {
    isAuthenticated,
    getIdTokenClaims,
    isLoading: isAuthLoading,
  } = useAuth0();
  const [checkout, setCheckout] = useState<boolean>(false);

  //featch the number of checkout book that person have
  useEffect(() => {
    if (isAuthLoading || !isAuthenticated) return;

    const featchCheckoutNum = async () => {
      //To get the object that have all info
      const tokenId = await getIdTokenClaims();
      // (tokenId?.__raw : is the token in the obgect info)
      const token = tokenId?.__raw;
      // console.log(token?.__raw);

      //to make an requset with send the token
      const response = await axios.get(
        "http://localhost:8080/api/secure/getBookCheckout",
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
      setIsloading(false);
      setNumOfCheckout(responseData);
    };
    featchCheckoutNum().catch((error) => {
      setIsloading(false);
      setHttpError(error.message);
    });
  }, [getIdTokenClaims, isAuthLoading, isAuthenticated]);

  //To featch is The book is checkout  ;
  useEffect(() => {
    if (isAuthLoading || !props.book || !isAuthenticated) return;

    const featchCheckout = async () => {
      //To get the object that have all info
      const tokenId = await getIdTokenClaims();
      // (tokenId?.__raw : is the token in the obgect info)
      const token = tokenId?.__raw;
      // console.log(token?.__raw);

      //to make an requset with send the token
      const responseForCheckTheCheckoutStatus = await axios.get(
        `http://localhost:8080/api/secure/checkBookCheckout?bookId=${props.book?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (responseForCheckTheCheckoutStatus.status !== 200) {
        throw Error();
      }

      const responseForCheckTheCheckoutStatusData =
        await responseForCheckTheCheckoutStatus.data;

      // console.log(
      //   "responseForCheckTheCheckoutStatus : " +
      //     responseForCheckTheCheckoutStatusData
      // );

      setIsCheckoutLoading(false);
      setCheckout(responseForCheckTheCheckoutStatusData);
    };
    featchCheckout().catch((error) => {
      setIsCheckoutLoading(false);
      setHttpError(error.message);
    });
  }, [checkout, getIdTokenClaims, isAuthLoading, isAuthenticated, props.book]);

  function renderButton() {
    if (isAuthenticated) {
      if (checkout)
        return <p className="text-primary">The book is checkout , enjoy</p>;
      else if (numOfCheckout >= 5)
        return <p className="text-danger">Too many books checked out </p>;
      else
        return (
          <button
            className="btn btn-success mt-3 btn-lg"
            onClick={props.handleCheckoutBook}
          >
            checkout
          </button>
        );
    } else {
      return (
        <Link to="/login" className="btn btn-success mt-3 btn-lg">
          sign up
        </Link>
      );
    }
  }

  //To handle the sign in steatment line
  function renderSign() {
    const optoin = [];
    for (let i = 0; i <= 5; i += 0.5) {
      optoin.push(i);
    }
    if (isAuthenticated && props.isLeftReview)
      return <p>Thank you for your reviewing </p>;
    else if (isAuthenticated && !props.isLeftReview) {
      return (
        <div className="dropdown">
          <span
            className=" dropdown-toggle bg-white fs-5 fw-semibold cursor-pointer"
            style={{ cursor: "pointer" }}
            data-bs-toggle="dropdown"
            aria-expanded={"false"}
          >
            Leave review
          </span>
          <ul className="dropdown-menu">
          
            {optoin.map((optoin, i) => (
              <li
                className="dropdown-item"
                key={i}
                onClick={() => {
                  setRating(optoin);
                  setPutRating(true);
                }}
              >
                {optoin}
              </li>
            ))}
          </ul>
          <StarRait rait={rating} size={32} />
        </div>
      );
    } else
      return (
        <div>
          <p>Sign in to br able to leave a review</p>
        </div>
      );
  }

  const handleSubmitReviewBtn = async () => {
    const url = `http://localhost:8080/api/secure/giveReview`;
    const getToken = await getIdTokenClaims();
    const token = await getToken?.__raw;
    const review: ReviewTheBook = new ReviewTheBook(
      props.book!.id,
      rating,
      description
    );
    console.log(review);

    const response = await axios.post(
      url,

      review,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status !== 200) {
      throw Error();
    }
    const responseData = await response.data;
    console.log(`Response of the review Request ${responseData}`);
    setPutRating(false);
    props.onReview();
  };

  if (isCheckoutLoading || isLoading) {
    return <Spinner />;
  }
  if (httpError) {
    return <div>{httpError}</div>;
  }

  return (
    <div
      className={
        props.mobile ? "mt-5 card d-flex" : "p-2 card col-4  d-flex mb-5"
      }
    >
      <div className="card-body container">
        <p>
          <b>{numOfCheckout}/5</b> books checked out
        </p>
        <hr />
        <h3 className="text-success">
          {props.book?.copies_avilavle ? "Avilable" : "Not Avilable"}
        </h3>
        <div className="row ">
          <p className="col-6">{props.book?.copies} copies</p>
          <p className="col-6">{props.book?.copies_avilavle} available</p>
        </div>
        {renderButton()}
        <hr />
        <p className="mt-3">
          This number can change until palcing order has been complete.
        </p>
        {renderSign()}

        {putRating && (
          <div className="d-flex flex-column gap-3">
            <hr />
            description
            <textarea
              placeholder="Decription"
              rows={5}
              onChange={(e) => {
                setDescription(e.target.value);
                console.log(description);
              }}
            ></textarea>
            <button className="btn btn-primary" onClick={handleSubmitReviewBtn}>
              Submit Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
