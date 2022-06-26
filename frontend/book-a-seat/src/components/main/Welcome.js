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
      <p>representative image</p>
      <p>On this website you can book your workspace.</p>
      {loginButtonElement}
    </>
  );
}

export default Welcome;
