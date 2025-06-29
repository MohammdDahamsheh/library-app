import Review from "../../Models/Review";
import { StarRait } from "./StarRaitComponent";

export const LastReview = (props: { review: Review }) => {
    const date=new Date(props.review.date);
    const month=date.toLocaleString('en-us',{month:'long'});
    const year=date.getFullYear();
    const day=date.getDay();
  return (
    <div>
      <div>
        <h6>{props.review.userEmail}</h6>
        <div className="row">
          <p className="col-6">{`${month} ${day}, ${year}` }</p>
          <div className="col-6">
            <StarRait rait={Number(props.review.rating)} size={16} />
          </div>
        </div>
        <p>{props.review.reviewDescription}</p>
        <hr />
      </div>
    </div>
  );
};
