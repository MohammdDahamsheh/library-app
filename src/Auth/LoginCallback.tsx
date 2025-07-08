import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const LoginCallback = () => {
  const { isLoading, error, handleRedirectCallback } = useAuth0();
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleAuthRedirect = async () => {
      try {
        await handleRedirectCallback();
        navigate("/"); // redirect to home or another page
      } catch (err) {
        console.error("Auth0 redirect callback error:", err);
      }
    };

    handleAuthRedirect();
  }, [handleRedirectCallback, navigate]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Redirecting...</div>;
};
