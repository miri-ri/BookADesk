import React from "react";

function AccountDetails({ user }) {
  return (
    <>
      <h2>account details!</h2>
      <p>{user.email}</p>
      <p>{user.password}</p>
      <p>{user.username}</p>
      <p>{user.firstName}</p>
      <p>{user.lastName}</p>
      <p>{user.admin}</p>
    </>
  );
}

export default AccountDetails;
