import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState } from "react";
import Message from "../../../Models/Message";

export const SendQuestion = () => {
  const [title, setTitle] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertWarining, setAlertWarining] = useState(false);

  const sendMeassageBtn = async () => {
    if (isAuthenticated) {
      const tokenId = await getIdTokenClaims();
      const token = tokenId?.__raw;

      if (question === "" || title === "") {
        setAlertSuccess(false);
        setAlertWarining(true);
        return;
      }

      const message: Message = {
        title: title,
        question: question,
      };

      const response = await axios.post(
        "http://localhost:8080/api/secure/postMessage",
        message,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status !== 200) throw Error();

      setQuestion("");
      setTitle("");
      setAlertSuccess(true);
      setAlertWarining(false);
    }
  };

  return (
    <div className="mt-3">
      <div className="container">
        <div className="card">
          <div className="card-header">
            <p>Ask question to Admin</p>
          </div>
          <div className="card-body">
            {
                alertSuccess&&
                <div className="alert alert-success" role="alert">
                    You send message successfully

                </div>
            }
            {
                alertWarining&&
                <div className="alert alert-danger" role="alert">
                    You must fill the title and the qustion filed

                </div>
            }

            <form method="POST">
              <div className="mt-2">
                <label htmlFor="title-message" className="form-label fs-5">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  id="title-message"
                  placeholder="Title"
                  value={title}
                  onChange={(ele) => setTitle(ele.target.value)}
                  required
                />
              </div>

              <div className="mt-4">
                <label htmlFor="messageQuestion" className="form-label fs-5">
                  Question
                </label>

                <textarea
                  name="question"
                  id="messageQuestion"
                  className="form-control"
                  required
                  value={question}
                  onChange={(ele) => setQuestion(ele.target.value)}
                ></textarea>
              </div>

              <button
                type="button"
                className="btn btn-lg btn-primary mt-5 "
                onClick={sendMeassageBtn}
              >
                Submit Question
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
