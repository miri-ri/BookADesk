import React, { useContext } from "react";
import { GlobalContext, URLs } from "../../App";
import Button from "../ui-common/Button";

function Welcome() {
  const { navigate } = useContext(GlobalContext);
  const loginButtonElement = (
    <Button title="Login" onClick={() => navigate(URLs.loginURL)} />
  );

  return (
    <>
      <div className="home">
        <div className="text">
          <br></br>
          Book A Desk
          <br></br>
          <br></br>
        </div>
      </div>
      <div className="text-body">On this website you can book your workspace.</div>
      <div className="login-button">
        {loginButtonElement}

      </div>
    </>
  );
}

export default Welcome;
