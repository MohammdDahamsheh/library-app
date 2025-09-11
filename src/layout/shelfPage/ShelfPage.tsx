import { Loans } from "./components/Loans";
import { History } from "./components/History";
import { use, useState } from "react";
import { useSearchParams } from "react-router-dom";
export const ShelfPage = () => {
  const [historyBtn, setHistoryBtn] = useState(false);

  return (
    <div className="container">
      <div className="mt-3">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              onClick={() => setHistoryBtn(false)}
              className="nav-link active"
              id="nav-loans-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-loans"
              type="button"
              role="tab"
              aria-controls="nav-loans"
              aria-selected="true"
            >
              Loans
            </button>
            <button
              onClick={() => setHistoryBtn(true)}
              className="nav-link"
              id="nav-history-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-history"
              type="button"
              role="tab"
              aria-controls="nav-history"
              aria-selected="false"
            >
              History
            </button>
          </div>
        </nav>

        {/* ✅ Only one tab-content wrapper */}
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-loans"
            role="tabpanel"
            aria-labelledby="nav-loans-tab"
          >
            {/* <p>Loans</p> */}
            <Loans />
          </div>
          <div
            className="tab-pane fade"
            id="nav-history"
            role="tabpanel"
            aria-labelledby="nav-history-tab"
          >
            {/* <p>Checkout History</p> */}
            {historyBtn?<History />:<></>}
          </div>
        </div>
      </div>
    </div>
  );
};
