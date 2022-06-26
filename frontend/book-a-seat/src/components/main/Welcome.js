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
    
      <div className="headline">Welcome to Book A Desk!</div>
      <br></br>
      <div className="body-text-center">Please log into your account to book a workspace.
        <br></br>
        <div className="login-button" style={{ margin:"20px" }}>
          {loginButtonElement}
        </div>
      </div>

    </>
  );
}

export default Welcome;
