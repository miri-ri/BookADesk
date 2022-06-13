import React from "react";
import Button from "../ui-common/Button";

function Overview({ toUserDetails, toWorkspace }) {
  const logout = () => {
    console.log("logout");
  };

  const detailsButtonElement = (
    <Button title="Show User Details" onClick={toUserDetails} />
  );
  const workspaceButtonElement = (
    <Button title={"Show Workspace"} onClick={toWorkspace} />
  );
  const logoutButtonElement = <Button title="Logout" onBlick={logout} />;

  // TODO: show workspaceButtonElement only if admin
  return (
    <>
      <p>Overview:</p>
      {detailsButtonElement}
      {workspaceButtonElement}
      {logoutButtonElement}
    </>
  );
}

export default Overview;
