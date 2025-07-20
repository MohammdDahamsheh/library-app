import { useEffect, useState } from "react";
import Review from "../../Models/Review";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { LastReview } from "./LastReview";
import { Spinner } from "../HomePage/components/spinner";

export const ShowAllReviews = () => {
  const [reviews, setReviews] = useState<Review[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [lenghtOfReviews, setLenghtOfReviews] = useState();
  const bookId = window.location.pathname.split("/")[2];

  const {
    isAuthenticated,
    getIdTokenClaims,
    isLoading: isAuthLoading,
  } = useAuth0();

  useEffect(() => {
    const featchReviews = async () => {
      if (isAuthenticated) {
        const getToken = await getIdTokenClaims();
        const token = getToken?.__raw;

        const response = await axios.get(
          `http://localhost:8080/api/review/${bookId}`
        );

        if (response.status !== 200) {
          throw Error();
        }

        setIsLoading(false);
        const responseData = await response.data;
        setReviews(responseData);
        setLenghtOfReviews(responseData.length);
      }
    };
    featchReviews().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  });

  if (isAuthLoading || isLoading) {
    return <Spinner />;
  }
  if (httpError) {
    return <div>{httpError}</div>;
  }

  return (
    <div className="container mt-3">
      <h3 className="mb-5">Comments : ({lenghtOfReviews})</h3>

      {reviews?.map((ele, index) => (
        <LastReview review={ele} key={index} />
      ))}
    </div>
  );
};
