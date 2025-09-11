import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import ShelfCurrentLoans from "../../../Models/ShelfCurrentLoans";
import { Spinner } from "../../HomePage/components/spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import { LoansModal } from "./LoansModal";

export const Loans = () => {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [httpError, setHttpError] = useState(null);
  const [shelfCurrentLoans, setShelfCurrentLoans] = useState<
    ShelfCurrentLoans[]
  >([]);
  const [isLoansLoading, setIsLoansLoading] = useState(true);
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    const featchLoans = async () => {
      if (!isAuthenticated) return;

      const tokenId = await getIdTokenClaims();

      const token = tokenId?.__raw;

      const respons = await axios.get(
        "http://localhost:8080/api/secure/currentLoan",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (respons.status !== 200) throw Error();

      const responsData = await respons.data;
      console.log(responsData);
      //   console.log(responsData[0]);

      setIsLoansLoading(false);
      setShelfCurrentLoans(responsData);
    };
    featchLoans().catch((error) => {
      setIsLoansLoading(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, [getIdTokenClaims, isAuthenticated, checkout]);

  if (isLoansLoading) {
    return <Spinner />;
  }
  if (httpError) return <div className="container m-5">{httpError}</div>;

  //  to handle the return book button
  async function returnBook(bookId: number) {
    const tokenId = await getIdTokenClaims();
    const token = tokenId?.__raw;

    const response = await axios.put(
      `http://localhost:8080/api/secure/returnBook?bookId=${bookId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) throw Error();

    const responseData = await response.data;
    console.log("return book data : " + responseData);

    setCheckout(!checkout);
  }

  async function renewBook(bookId: number) {
    const tokenId = await getIdTokenClaims();
    const token = tokenId?.__raw;

    const response = await axios.put(
      `http://localhost:8080/api/secure/renewBook?bookId=${bookId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) throw Error();

    const responseData = await response.data;

    setCheckout(!checkout);
  }

  return (
    <div>
      {/* desktop */}
      <div className="d-none d-lg-block mt-2 ">
        {shelfCurrentLoans.length > 0 ? (
          <>
            <h5>Current loans </h5>

            {shelfCurrentLoans.map((shelfCurrentLoan, index) => (
              <div key={shelfCurrentLoan.book?.id ?? index}>
                <div className="row mt-3 mb-3">
                  <div className="col-4 col-md-4 container">
                    {shelfCurrentLoan.book?.img ? (
                      <img
                        src={shelfCurrentLoan.book.img}
                        width={226}
                        height={349}
                        alt=""
                      />
                    ) : (
                      <img src={"#"} alt="none" />
                    )}
                  </div>

                  <div className="card col-3 col-md-3 container d-flex">
                    <div className="card-body">
                      <div className="mt-3">
                        <h4>Loan options :</h4>
                        {shelfCurrentLoan.daysLeft > 0 && (
                          <p className="text-secondary">
                            due in {shelfCurrentLoan.daysLeft} days
                          </p>
                        )}
                        {shelfCurrentLoan.daysLeft === 0 && (
                          <p className="text-success">Due today</p>
                        )}
                        {shelfCurrentLoan.daysLeft < 0 && (
                          <p className="text-danger">
                            past due in {shelfCurrentLoan.daysLeft} days
                          </p>
                        )}

                        <div className="list-group mt-3">
                          <button
                            className="list-group-item list-group-item-action"
                            aria-current="true"
                            data-bs-toggle="modal"
                            data-bs-target={`#modal${
                              shelfCurrentLoan.book?.id ?? index
                            }`}
                          >
                            Manage Loan
                          </button>
                          <Link
                            to="/search"
                            className="list-group-item list-group-item-action"
                          >
                            Search more books?
                          </Link>
                        </div>
                      </div>
                      <hr />
                      <p className="mt-3 ">
                        Help other to find thier adventure by reviewing your
                        loan .
                      </p>
                      <Link
                        className="btn btn-primary"
                        to={`/checkout/${shelfCurrentLoan.book?.id}`}
                      >
                        leave a review
                      </Link>
                    </div>
                  </div>
                </div>
                <hr />
                <LoansModal
                  mobile={false}
                  shelfCurrentLoans={shelfCurrentLoan}
                  returnBook={returnBook}
                  renewBook={renewBook}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            <h3>currently no loans </h3>
            <Link className="btn btn-primary" to={`/search`}>
              search new books
            </Link>
          </>
        )}
      </div>

      {/* moblie  */}

      <div className=" d-lg-none mt-3 ">
        {shelfCurrentLoans.length > 0 ? (
          <>
            <h5 className="mb-3">Current loans </h5>

            {shelfCurrentLoans.map((shelfCurrentLoan, index) => (
              <div key={shelfCurrentLoan.book?.id ?? index}>
                <div className="d-flex justify-content-center algin-item-center">
                  {shelfCurrentLoan.book?.img ? (
                    <img
                      src={shelfCurrentLoan.book.img}
                      width={226}
                      height={349}
                      alt=""
                    />
                  ) : (
                    <img src={"#"} alt="none" />
                  )}
                </div>

                <div className="card  d-flex mt-5 mb-3">
                  <div className="card-body">
                    <div className="mt-3">
                      <h4>Loan options :</h4>
                      {shelfCurrentLoan.daysLeft > 0 && (
                        <p className="text-secondary">
                          due in {shelfCurrentLoan.daysLeft} days
                        </p>
                      )}
                      {shelfCurrentLoan.daysLeft === 0 && (
                        <p className="text-success">Due today</p>
                      )}
                      {shelfCurrentLoan.daysLeft < 0 && (
                        <p className="text-danger">
                          past due in {shelfCurrentLoan.daysLeft} days
                        </p>
                      )}

                      <div className="list-group mt-3">
                        <button
                          className="list-group-item list-group-item-action"
                          aria-current="true"
                          data-bs-toggle="modal"
                          data-bs-target={`#mobilemodal${
                            shelfCurrentLoan.book?.id ?? index
                          }`}
                        >
                          Manage Loan
                        </button>
                        <Link
                          to="/search"
                          className="list-group-item list-group-item-action"
                        >
                          Search more books?
                        </Link>
                      </div>
                    </div>
                    <hr />
                    <p className="mt-3 ">
                      Help other to find thier adventure by reviewing your loan
                      .
                    </p>
                    <Link
                      className="btn btn-primary"
                      to={`/checkout/${shelfCurrentLoan.book?.id}`}
                    >
                      leave a review
                    </Link>
                  </div>
                </div>
                <hr />
                <LoansModal
                  mobile={true}
                  shelfCurrentLoans={shelfCurrentLoan}
                  returnBook={returnBook}
                  renewBook={renewBook}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            <h3>currently no loans </h3>
            <Link className="btn btn-primary" to={`/search`}>
              search new books
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
