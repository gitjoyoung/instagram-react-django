import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import { Configuration, OpenAIApi } from "openai";


const clientId =
  "676497279091-mkq9qmnh0iq09m9qmtullhkaoanlap1m.apps.googleusercontent.com";

export default function GoogleButton({ onSocial }) {
  const onSuccess = async (response) => {
    console.log("response", response);
  };

  const onFailure = (error) => {
    console.log("error", error);
  };
  const GoogleContaniner = <div></div>;
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div style={{ width: "200px", backgroundColor: "blue" }}>
        <GoogleLogin
          buttonText="Log in with Google"
          responseType={"id_token"}
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
      </div>
    </GoogleOAuthProvider>
  );
}
