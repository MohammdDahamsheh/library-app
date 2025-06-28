import { Link } from "react-router-dom";
import BookModel from "../../Models/Book";

export const BookCheckoutComponent = (props: {
  book: BookModel | undefined;
  mobile: boolean;
}) => {
  return (
    <div
      className={
        props.mobile
          ? "mt-5 card d-flex"
          : "p-2 card col-4  d-flex mb-5"
      }
    >
        <div className="card-body container">
          <p>
            <b>0/5</b> books checked out
          </p>
          <hr />
          <h3 className="text-success">
            {props.book?.copies_avilavle ? "Avilable" : "Not Avilable"}
            
          </h3>
          <div className="row ">
            <p className="col-6">{props.book?.copies} copies</p>
            <p className="col-6">{props.book?.copies_avilavle} available</p>
          </div>
          <Link to="/#" className="btn btn-success mt-3 btn-lg">
            sign up
          </Link>
          <hr />
          <p className="mt-3">This number can change until palcing order has been complete.</p>
          <p>Sign in to br able to leave a review</p>
        </div>
    </div>
  );
};
