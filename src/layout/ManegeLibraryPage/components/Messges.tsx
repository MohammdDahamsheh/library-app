import { useEffect, useState } from "react";
import Message from "../../../Models/Message";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Spinner } from "../../HomePage/components/spinner";
import { Pagenation } from "../../searchBooksComponent/Pageation";
import { MessagesAdmin } from "./MessagesAdmin";

export const Messeges = () => {
  const [messges, setMesseges] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const { isAuthenticated, getIdTokenClaims } = useAuth0();

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  

  useEffect(() => {
    const feachMesseges = async () => {
      if (isAuthenticated) {
        const tokenId = await getIdTokenClaims();
        const token = tokenId?.__raw;

        const response = await axios.get(
          `http://localhost:8080/api/secure/getNotClosedMessages?pageNum=${
            currentPage - 1
          }&pageSize=${5}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status !== 200) throw Error();

        setMesseges(response.data.content);
        setTotalPages(response.data.totalPages);
      }
      setIsLoading(false);
    };

    feachMesseges().catch((error) => {
      setIsLoading(false);
      setHttpError(error.messege);
    });
  }, [isAuthenticated, getIdTokenClaims, messges, currentPage]);

  
  const pagenat = (num: number) => setCurrentPage(num);

  if (isLoading) return <Spinner />;
  if (httpError) return <>{httpError}</>;

  return (
    <div className="mt-3">
      <div className="container">
        <h5>pending Q\A</h5>

        {messges.length > 0 ? (
          <div className="mt-3">
            {messges.map((messge, index) => (
            <MessagesAdmin messge={messge}/>
            ))}
          </div>
        ) : (
          <div>
            <h6>No Messages Sent</h6>
          </div>
        )}
        {totalPages > 1 && (
          <Pagenation
            currentPage={currentPage}
            totalPage={totalPages}
            paginate={pagenat}
          />
        )}
      </div>
    </div>
  );
};
