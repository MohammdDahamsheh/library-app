import { useState } from "react";
import Message from "../../../Models/Message";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export const MessagesAdmin = (props: { messge: Message }) => {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();

//   const [submitBtn, setSubmitBtn] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [displayWarning, setDisplayWarning] = useState(false);
//   const [displaySuccess, setDisplaySuccess] = useState(false);

  const handleSubmitResponseBtn = async (messege: Message) => {
    if (description.trim() === "") {
      setDisplayWarning(true);
    //   setDisplaySuccess(false);
    } else if (isAuthenticated && description.trim() !== "") {
      const tokenId = await getIdTokenClaims();
      const token = tokenId?.__raw;
      messege.response = description;
      messege.adminEmail = tokenId?.email;
      messege.closed = true;

      const response = await axios.put(
        `http://localhost:8080/api/secure/putMessageResponse`,
        messege,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status !== 200) throw Error();

      //   setDescription("");
      //   setSubmitBtn(false);
      setDisplayWarning(false);
    //   setDisplaySuccess(true);
    }
  };

  return (
    <div key={props.messge.id}>
      {/* {displaySuccess && (
        <div className="alert alert-success" role="alert">
          The response sent successfully
        </div>
      )} */}
      <div className="mt-3 card p-3 shdow bg-body mb-3 rounded">
        {displayWarning && (
          <div className="alert alert-danger" role="alert">
            You Should Write a Response to submit
          </div>
        )}

        <div className="card-body">
          <h5>{`Case #${props.messge.id} : ${props.messge.title}`}</h5>
          <p className="mt-2">{props.messge.userEmail}</p>
          <p className="mt-2 fs-5">{props.messge.question}</p>
        </div>
        <hr />
        <div className="card-body">
          <b className="fs-5 mt-4">Response</b>
          <div className="mt-3">
            <form method="post">
              <label htmlFor="responseBlock">Description</label>
              <textarea
                onChange={(ele) => setDescription(ele.target.value)}
                name="description"
                id="responseBlock"
                className="form-control"
                required
              ></textarea>

              <button
                type="button"
                className="btn btn-lg btn-primary mt-5"
                onClick={() => {
                  handleSubmitResponseBtn(props.messge);
                }}
              >
                Submit Response
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
