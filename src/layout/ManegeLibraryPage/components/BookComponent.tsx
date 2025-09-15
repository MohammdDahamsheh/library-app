import { useEffect, useState } from "react";
import BookModel from "../../../Models/Book";
import BookForUpdate from "../../../Models/BookForUpdate";

export const BookComponent = (props: {
  book: BookForUpdate;
  deleteFun: any;
  saveFun: any;
}) => {
  //   console.log(props.book);

  const [totalCopies, setTotalCopies] = useState(props.book.copies);
  const [totalCopiesAvailable, setTotalCopiesAvailable] = useState(
    props.book.copiesAvailable
  );
  const [successSave, setSuccessSave] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (successSave || successDelete) {
      timer = setTimeout(() => {
        setSuccessSave(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [successSave, successDelete]);

  return (
    <div className="card shadow mt-2 mb-4 p-3 bg-body rounded">
      {successSave && (
        <div className="alert alert-success" role="alert">
          Save the change successfully
        </div>
      )}

      <div className="card-body">
        {/* first row */}

        <div className="row">
          {/* image columnn */}
          <div className="col-2">
            <img src={props.book.img} alt="NONE" width={140} height={200} />
          </div>
          {/* details column */}
          <div className="col-7">
            <p>{props.book.author}</p>
            <p className="fs-5">{props.book.title}</p>
            <p>{props.book.description}</p>
          </div>
          {/* countity coulmn */}
          <div className="col-2">
            <p>Total Quantity : {totalCopies}</p>
            <p>Books Remaining : {totalCopiesAvailable}</p>
          </div>
        </div>

        <div className="row mt-3 d-flex justify-content-around">
          <button
            className="btn btn-danger col-5"
            onClick={() => {
              props.deleteFun(props.book);
              setSuccessDelete(true);
            }}
          >
            Delete
          </button>
          <button
            className=" btn btn-primary col-5"
            onClick={() => {
              props.book.copies = totalCopies;
              props.book.copiesAvailable = totalCopiesAvailable;
              props.saveFun(props.book);
              setSuccessSave(true);
            }}
          >
            save
          </button>
        </div>
        <div className="row mt-3">
          <button
            className="mx-1 btn btn-success"
            onClick={() => {
              setTotalCopies(totalCopies + 1);
              setTotalCopiesAvailable(totalCopiesAvailable + 1);
            }}
          >
            Increase Quntity
          </button>
        </div>
        <div className="row mt-3">
          <button
            className="mx-1 btn btn-warning"
            onClick={() => {
              totalCopies > 0 ? setTotalCopies(totalCopies - 1) : <></>;
              totalCopiesAvailable > 0 ? (
                setTotalCopiesAvailable(totalCopiesAvailable - 1)
              ) : (
                <></>
              );
            }}
          >
            Decrease Quntity
          </button>
        </div>
      </div>
    </div>
  );
};
