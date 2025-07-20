/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./App.css";
import { Navbar } from "./layout/navbarAndFooter/Navbar";
import { Footer } from "./layout/navbarAndFooter/footer";
import { HomePage } from "./layout/HomePage/Homepage";
import { SearchBooksPage } from "./layout/searchBooksComponent/SearchBooksPage";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { BookCheckoutPage } from "./layout/bookCheckoutComponent/BookCheckoutPage";
import { auth0Config } from "./lip/Auth0Config";
import { Auth0Provider } from "@auth0/auth0-react";
import LoginPage from "./Auth/LoginPage";
import { LoginCallback } from "./Auth/LoginCallback";
import { ShowAllReviews } from "./layout/bookCheckoutComponent/ShowAllReviews";

const Auth0ProviderWithHistory = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || "/home");
  };

  return (
    <Auth0Provider
      domain={auth0Config.issuer}
      clientId={auth0Config.clientId}
      authorizationParams={{
        redirect_uri: auth0Config.redirectUri,
        audience: auth0Config.audience,
        scope: auth0Config.scope,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Auth0ProviderWithHistory>
        <Navbar />

        <div className="flex-grow-1">
          {/* <SearchBooksPage/> */}
          {/* <HomePage /> */}
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/search" element={<SearchBooksPage />} />
            <Route path="/checkout/:bookId" element={<BookCheckoutPage />} />
            <Route path="/callback" element={<LoginCallback />} />
            <Route path="/reachAllReviews/:bookId" element={<ShowAllReviews/>} />

            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
        <Footer />
      </Auth0ProviderWithHistory>
    </div>
  );
}

export default App;
