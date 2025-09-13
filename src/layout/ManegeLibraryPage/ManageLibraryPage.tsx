import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Spinner } from "../HomePage/components/spinner";
import { Messeges } from "./components/Messges";

export const ManageLibraryPage = () => {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [changeQuntityBtn, setChangeQuntityBtn] = useState(false);
  const [messegeBtn, setMessegeBtn] = useState(false);
  const [roles, setRoles] = useState<string[] | null>(null);

  useEffect(() => {
    const feachRoles = async () => {
      if (isAuthenticated) {
        const claim = await getIdTokenClaims();
        const feachRoles = claim?.["https://myLibraryApp.com/roles"] || [];

        // console.log(" roles : " + feachRoles);
        setRoles(feachRoles);
      }
    };
    feachRoles();
  }, [getIdTokenClaims,isAuthenticated]);

  if (roles == null) {
    return <Spinner />;
  }

  if (!roles?.includes("Admin")) {
    console.log("******** " + roles);

    return <Navigate to={"/home"} />;
  }

  return (
    <div className="container">
      <div className="mt-3">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              onClick={() => {
                setChangeQuntityBtn(false);
                setMessegeBtn(false);
              }}
              className="nav-link active"
              id="nav-addNewItems-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-addNewItems"
              type="button"
              role="tab"
              aria-controls="nav-addNewItems"
              aria-selected="true"
            >
              Add new book
            </button>
            <button
              onClick={() => {
                setChangeQuntityBtn(true);
                setMessegeBtn(false);
              }}
              className="nav-link"
              id="nav-changeQuntity-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-changeQuntity"
              type="button"
              role="tab"
              aria-controls="nav-changeQuntity"
              aria-selected="false"
            >
              Change Quntity
            </button>

            <button
              onClick={() => {
                setChangeQuntityBtn(false);
                setMessegeBtn(true);
              }}
              className="nav-link"
              id="nav-messege-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-messege"
              type="button"
              role="tab"
              aria-controls="nav-messege"
              aria-selected="false"
            >
              Messeges
            </button>
          </div>
        </nav>

        {/* ✅ Only one tab-content wrapper */}
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-addNewItems"
            role="tabpanel"
            aria-labelledby="nav-addNewItems-tab"
          >
            <p>Add new Items</p>
          </div>

          <div
            className="tab-pane fade "
            id="nav-changeQuntity"
            role="tabpanel"
            aria-labelledby="nav-changeQuntity-tab"
          >
            <p>change Quntity</p>
          </div>

          <div
            className="tab-pane fade"
            id="nav-messege"
            role="tabpanel"
            aria-labelledby="nav-messege-tab"
          >
            {/* <p>MesaddNewItems</p>
             */}
            {messegeBtn && <Messeges />}
          </div>
        </div>
      </div>
    </div>
  );
};
