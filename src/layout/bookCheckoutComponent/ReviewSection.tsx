import { Link } from "react-router-dom";
import Review from "../../Models/Review";
import { LastReview } from "./LastReview";

export const ReviewSection = (props: { review: Review[]; mobile: boolean,bookId:number }) => {
  return (
    <div className={props.mobile ? "mt-3" : "row mt-5"}>
      <div className={props.mobile ? "" : "col-sm-2 col-md-2"}>
        <h3>Latest Review</h3>
      </div>
      <div className={props.mobile ? "" : "col-sm-10 col-md-10"}>
        {props.review.length > 0 ? (
          <>
            {props.review.slice(0, 3).map((review,i) => (
              <LastReview review={review} key={i}/>
            ))}
            <Link
              to={`/reachAllReviews/${props.bookId}`}
              type="button"
              className="btn btn-lg main-color text-white mb-5"
            >
              Reach all reviews
            </Link>
          </>
        ) : (
          <div className="m-3">
            <p className="lead">Currently there are no reviews for this book</p>
          </div>
        )}
      </div>
    </div>
  );
};
