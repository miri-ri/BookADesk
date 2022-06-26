import React, { useContext, useEffect } from "react";
import Button from "../ui-common/Button";
import { GlobalContext, URLs } from "../../App";

function Overview({ toWorkspace, toReservation, logout }) {
  const { user, guards, navigate } = useContext(GlobalContext);

  const detailsButtonElement = (
    <Button
      title="User Details"
      onClick={() => navigate(URLs.userDetailsURL)}
    />
  );
  const workspaceButtonElement = (
    <Button title="Workspaces" onClick={toWorkspace} />
  );
  const reservationButtonElement = (
    <Button title="Reservations" onClick={toReservation} />
  );
  const logoutButtonElement = <Button title="Logout" onClick={logout} />;

  useEffect(() => {
    guards.userGuard(!!user);
    // TODO: isAdminGuard
  });

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
