import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import HistoryModel from "../../../Models/Hestory";
import axios from "axios";
import { Spinner } from "../../HomePage/components/spinner";
import { Link } from "react-router-dom";
import { Pagenation } from "../../searchBooksComponent/Pageation";

export const History = () => {
  const [httpError, setHttpError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [historyData, setHistoryData] = useState<HistoryModel[]>([]);
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [totalPages, setTotalPages] = useState(0);
  const [currentPages, setCurrentPages] = useState(1);

  useEffect(() => {
    const featchHistoryData = async () => {
      if (isAuthenticated) {
        const tokenId = await getIdTokenClaims();
        const token = tokenId?.__raw;

        const respons = await axios.get(
          `http://localhost:8080/api/secure/history?pageNum=${currentPages-1}&pageSize=${5}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (respons.status !== 200) throw Error();

        const responsData = await respons.data;
        // console.log("History Data : " + responsData);

        

        setTotalPages(responsData.totalPages);
        setHistoryData(responsData.content);
        
        
      }

      setIsLoading(false);
    };
    featchHistoryData().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [getIdTokenClaims, isAuthenticated, historyData, currentPages,totalPages]);

  const pagenat = (pageNum: number) => setCurrentPages(pageNum);

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (httpError) return <div>{httpError}</div>;

  return (
    <div className="mt-2">
      {historyData.length > 0 ? (
        <div>
          <h5>React History</h5>

          {historyData.map((history) => (
            <div key={history.id}>
              <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
                <div className="row g-0">
                  <div className="col-md-2">
                    <div className="d-none d-lg-block">
                      {
                        <img
                          src={history.img}
                          alt="none"
                          width={123}
                          height={196}
                        />
                      }
                    </div>
                    <div className="d-lg-none d-flex justify-content-center align-items-center">
                      <div className="d-none d-lg-block">
                        {
                          <img
                            src={history.img}
                            alt="none"
                            width={123}
                            height={196}
                          />
                        }
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card-body">
                      <h5 className="card-title">{history.author}</h5>
                      <h4>{history.title}</h4>
                      <p className="card-text">{history.description}</p>
                      <hr />
                      <div className="card-text">{history.checkoutDate}</div>
                      <div className="card-text">
                        {history.returnDate}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
            <h3 className="mt-3">
                Currently no history

            </h3>
            <Link className="btn btn-primary" to={"/search"}>search for new book</Link>
        </div>
      )}

      {totalPages>1 && <Pagenation currentPage={currentPages} totalPage={totalPages} paginate={pagenat}/>}
    </div>
  );
};
