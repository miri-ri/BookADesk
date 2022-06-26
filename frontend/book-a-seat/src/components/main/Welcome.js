import React from "react";
import Button from "../ui-common/Button";
import "./Main.css"

function Welcome({ toLogin }) {
  const loginButtonElement = <Button title="Login" onClick={toLogin} />;

  return (
    <>
      <div className="home">
        <div className="text">
          <br></br>
          
          <br></br>
          <br></br>
        </div>
      </div>
      <br></br>
    
      <h3 className="text-body">Welcome to Book A Desk!</h3>
      <br></br>
      <div className="text-body"> Please log into your account to book a workspace.</div>
      <br></br>
      <div className="login-button">
        {loginButtonElement}

      </div>
    </>
  );
}

export default Welcome;
