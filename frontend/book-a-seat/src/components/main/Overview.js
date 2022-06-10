import React from "react";
import Button from "../ui-common/Button";

function Overview({ toUserDetails }) {
  const logout = () => {
    console.log("logout");
  };

  const detailsButtonElement = (
    <Button title="Show User Details" onClick={toUserDetails} />
  );
  const logoutButtonElement = <Button title="Logout" onBlick={logout} />;

  return (
    <>
      <p>Overwiew:</p>
      {detailsButtonElement}
      {logoutButtonElement}
    </>
  );
}

export default Overview;
