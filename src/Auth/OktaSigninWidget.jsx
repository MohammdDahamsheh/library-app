import OktaSignIn from "@okta/okta-signin-widget";
import { useEffect, useRef } from "react";
import { oktaConfig } from "../lip/Auth0Config";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";

const OktaSigninWedget = ({ onSuccess, onError }) => {
  const widgetRef = useRef();

  useEffect(() => {
    if (!widgetRef.current) return false;

    const widget = new OktaSignIn(oktaConfig);

    widget
      .showSignInToGetTokens({
        el: widgetRef.current,
      })
      .then(onSuccess)
      .catch(onError);

    return () => widget.remove();
  }, [onError, onSuccess]);

  return (
    <div className="container mt-5 mb-5">
      <div ref={widgetRef}></div>
    </div>
  );
};

export default OktaSigninWedget;
