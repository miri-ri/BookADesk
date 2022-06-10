import React from "react";
import Button from "../ui-common/Button";

function Welcome({ toLogin }) {
  const loginButtonElement = <Button title="Login" onClick={toLogin} />;

  return (
    <>
      <p>representative image</p>
      <p>descriptive text</p>
      {loginButtonElement}
    </>
  );
}

export default Welcome;
