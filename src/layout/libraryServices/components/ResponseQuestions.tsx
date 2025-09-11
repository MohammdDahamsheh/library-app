import { useEffect, useState } from "react";
import Message from "../../../Models/Message";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Pagenation } from "../../searchBooksComponent/Pageation";
import { Spinner } from "../../HomePage/components/spinner";

export const ResponseQuestions = () => {
  const [httpError, setHttpError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const featchMessages = async () => {
      if (isAuthenticated) {
        const tokenId = await getIdTokenClaims();
        const token = tokenId?.__raw;

        const response = await axios(
          `http://localhost:8080/api/secure/getMessages?pageNum=${
            currentPage - 1
          }&pageSize=${5}`
        ,{headers:{Authorization:`Bearer ${token}`}});
        if (response.status !== 200) throw Error();

        const responseData = response.data;
        setTotalPages(responseData.totalPages);
        setMessages(responseData.content);
      }
      setIsLoading(false);
    };
    featchMessages().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [isAuthenticated, getIdTokenClaims, messages, currentPage]);

  const paginate = (pageNum: number) => setCurrentPage(pageNum);

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }
  if (httpError) {
    return <div>{httpError}</div>;
  }
  return (
    <div className="container">
      <h5>Current Q/A</h5>

      {messages.length > 0 ? (
        <div className="mt-3">
          {messages.map((message) => (
            <div key={message.id}>
              <div className="card shadow p-3 mt-3 mb-3 bg-body rounded">
                <div className="card-body">
                  <div className="card-title">
                    {`Case ${message.id} : ${message.title}`}
                  </div>
                  <p className="card-text">{message.userEmail}</p>
                  <p className="fs-4">{message.question}</p>
                </div>
                <hr />
                <div className="card-body">
                  <div className="card-title">{`Response :`}</div>

                  {message.adminEmail &&message.response ? (
                    <div>
                      <p className="card-text">{message.adminEmail}</p>
                      <p className="fs-4">{message.response}</p>
                    </div>
                  ) : (
                    <p className="fs-5 mt-3 ">
                      Pinding response from adminisration...
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {totalPages > 0 && (
            <Pagenation
              totalPage={totalPages}
              paginate={paginate}
              currentPage={currentPage}
            />
          )}
        </div>
      ) : (
        <h5>No Messages You Send To Adminisration</h5>
      )}
    </div>
  );
};
