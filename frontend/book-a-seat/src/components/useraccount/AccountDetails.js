import React from "react";
import Button from "../ui-common/Button";

function AccountDetails({ user, toEdit, toOverview }) {
  const backButtonElement = <Button title="Back" onClick={toOverview} />;
  const editButtonElement = <Button title="Edit" onClick={toEdit} />;

  return (
    <>
      <div className="body">
        <div className="form">
        <div className="headline">Account Details</div>
        <table style={{width:"100%"}}>
            <tr> <td style={{paddingBottom:"1em", textAlign:"left"}}>E-Mail:</td><td style={{paddingBottom:"1em", textAlign:"left"}}>{user.email}</td></tr>
            <tr> <td style={{paddingBottom:"1em", textAlign:"left"}}>Password:</td><td style={{paddingBottom:"1em", textAlign:"left"}}>{user.password}</td></tr>
            <tr> <td style={{paddingBottom:"1em", textAlign:"left"}}>Username:</td><td style={{paddingBottom:"1em", textAlign:"left"}}>{user.username}</td></tr>
            <tr> <td style={{paddingBottom:"1em", textAlign:"left"}}>First Name:</td><td style={{paddingBottom:"1em", textAlign:"left"}}>{user.firstName}</td></tr>
            <tr> <td style={{paddingBottom:"1em", textAlign:"left"}}>Last Name:</td><td style={{paddingBottom:"1em", textAlign:"left"}}>{user.lastName}</td></tr>
            <tr> <td style={{paddingBottom:"1em", textAlign:"left"}}>Admin:</td><td style={{paddingBottom:"1em", textAlign:"left"}}>{user.admin}</td></tr>
        </table>
        {backButtonElement}
        {editButtonElement}
        </div>
      </div>
    </>
  );
}

export default AccountDetails;
