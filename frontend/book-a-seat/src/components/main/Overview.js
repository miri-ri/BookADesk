import React from "react";
import Button from "../ui-common/Button";

function Overview({ toUserDetails, toWorkplace }) {
  const logout = () => {
    console.log("logout");
  };

  const detailsButtonElement = (
    <Button title="Show User Details" onClick={toUserDetails} />
  );
  const workplaceButtonElement = (
    <Button title={"Show Workplace"} onClick={toWorkplace} />
  );
  const logoutButtonElement = <Button title="Logout" onBlick={logout} />;

  // TODO: show workplaceButtonElement only if admin
  return (
    <>
      <p>Overview:</p>
      {detailsButtonElement}
      {workplaceButtonElement}
      {logoutButtonElement}
    </>
  );
}

export default Overview;
