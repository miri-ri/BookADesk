import React from "react";
import Button from "../ui-common/Button";

function Overview({ toUserDetails, toWorkspace, toReservation }) {
  const logout = () => {
    console.log("logout");
  };

  const detailsButtonElement = (
    <Button title="Show User Details" onClick={toUserDetails} />
  );
  const workspaceButtonElement = (
    <Button title="Show Workspace" onClick={toWorkspace} />
  );
  const reservationButtonElement = (
    <Button title="Show Reservations" onClick={toReservation} />
  );
  const logoutButtonElement = <Button title="Logout" onBlick={logout} />;

  // TODO: show workspaceButtonElement only if admin
  return (
    <>
      <h4>Overview:</h4>
      {detailsButtonElement}
      {reservationButtonElement}
      {logoutButtonElement}
      <h4 className="pt-3">Admin Area:</h4>
      {workspaceButtonElement}
    </>
  );
}

export default Overview;
