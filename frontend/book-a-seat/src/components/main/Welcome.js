import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui-common/Button";

function Welcome() {
  const loginButtonElement = (
    <Button title="Login" onClick={() => navigate("/useraccount")} />
  );

  const navigate = useNavigate();

  return (
    <>
      <p>representative image</p>
      <p>descriptive text</p>
      {loginButtonElement}
    </>
  );
}

export default Welcome;
