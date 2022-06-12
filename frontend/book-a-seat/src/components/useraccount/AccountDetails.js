import React from "react";
import Button from "../ui-common/Button";

function AccountDetails({ user, toEdit, toOverview }) {
  const backButtonElement = <Button title="Back" onClick={toOverview} />;
  const editButtonElement = <Button title="Edit" onClick={toEdit} />;

  return (
    <>
      <h2>account details!</h2>
      <p>{user.email}</p>
      <p>{user.password}</p>
      <p>{user.username}</p>
      <p>{user.firstName}</p>
      <p>{user.lastName}</p>
      <p>{user.admin}</p>
      {backButtonElement}
      {editButtonElement}
    </>
  );
}

export default AccountDetails;
