import ShelfCurrentLoans from "../../../Models/ShelfCurrentLoans";

export const LoansModal = (props: {
  mobile: boolean;
  shelfCurrentLoans: ShelfCurrentLoans;
  returnBook: any;
  renewBook: any;
}) => {
  return (
    <div
      className="modal fade"
      id={
        props.mobile
          ? `mobilemodal${props.shelfCurrentLoans.book?.id}`
          : `modal${props.shelfCurrentLoans.book?.id}`
      }
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
      key={props.shelfCurrentLoans.book?.id}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Loan Options
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="mt-3">
                <div className="row ">
                  {/* image div  */}
                  <div className="col-2">
                    <img
                      src={props.shelfCurrentLoans.book?.img}
                      width={56}
                      height={87}
                      alt=""
                    />
                  </div>
                  {/* title book div */}
                  <div className="col-10">
                    <h6>{props.shelfCurrentLoans.book?.author}</h6>
                    <h3>{props.shelfCurrentLoans.book?.title}</h3>
                  </div>
                </div>
                <hr />
              </div>

              <div className="mt-2">
                {props.shelfCurrentLoans.daysLeft > 0 && (
                  <p className="text-secondary">
                    due in {props.shelfCurrentLoans.daysLeft} days
                  </p>
                )}
                {props.shelfCurrentLoans.daysLeft === 0 && (
                  <p className="text-success">Due today</p>
                )}
                {props.shelfCurrentLoans.daysLeft < 0 && (
                  <p className="text-danger">
                    past due in {props.shelfCurrentLoans.daysLeft} days
                  </p>
                )}
              </div>
              <div className="list-group mt-3">
                <button
                  data-bs-dismiss="modal"
                  className="list-group-item list-group-item-action"
                  aria-current="true"
                  onClick={() =>
                    props.returnBook(props.shelfCurrentLoans.book?.id)
                  }
                >
                  Return Book
                </button>

                <button
                  data-bs-dismiss="modal"
                  className={
                    props.shelfCurrentLoans.daysLeft < 0
                      ? `list-group-item list-group-item-action inactiveLink`
                      : "list-group-item list-group-item-action"
                  }
                  onClick={props.shelfCurrentLoans.daysLeft < 0?
                    (event)=>event.preventDefault:
                    () =>
                    props.renewBook(props.shelfCurrentLoans.book?.id)
                  }
                >
                  {props.shelfCurrentLoans.daysLeft < 0
                    ? "Late dues cannot be renewed"
                    : "Renew loan for 7 days"}
                </button>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
