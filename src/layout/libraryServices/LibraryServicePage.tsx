import { useState } from "react";
import { SendQuestion } from "./components/SendQuestion";
import { ResponseQuestions } from "./components/ResponseQuestions";


export const LibraryServicePage=()=>{

    const [responseTab,setResponseTab]=useState(false);




    return(

<div className="container">
      <div className="mt-3">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              onClick={() => setResponseTab(false)}
              className="nav-link active"
              id="nav-submintQuestion-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-submintQuestion"
              type="button"
              role="tab"
              aria-controls="nav-submintQuestion"
              aria-selected="true"
            >
              Submit Question
            </button>
            <button
              onClick={() => setResponseTab(true)}
              className="nav-link"
              id="nav-responsePinding-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-responsePinding"
              type="button"
              role="tab"
              aria-controls="nav-responsePinding"
              aria-selected="false"
            >
              Q/A Response/Pinding 
            </button>
          </div>
        </nav>

        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-submintQuestion"
            role="tabpanel"
            aria-labelledby="nav-submintQuestion-tab"
          >
            {/* <p>subment question</p> */}
            <SendQuestion/>
            
          </div>
          <div
            className="tab-pane fade"
            id="nav-responsePinding"
            role="tabpanel"
            aria-labelledby="nav-responsePinding-tab"
          >
            {/* <p>Q/A</p> */}

            {responseTab&&<ResponseQuestions/>}
          </div>
        </div>
      </div>
    </div>

    );
}