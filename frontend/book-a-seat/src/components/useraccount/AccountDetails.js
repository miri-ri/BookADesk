import React from "react";
import Button from "../ui-common/Button";
import useAxios from "../../utils/useAxios";
import { GlobalContext } from "../../App";
import { useContext } from "react";

function AccountDetails({ toEdit, toOverview }) {
  const backButtonElement = <Button title="Back" onClick={toOverview} />;
  const editButtonElement = <Button title="Edit" onClick={toEdit} />;

  const { user } = useContext(GlobalContext);

  return (
    <>
      <div className="body">
        <div className="form">
          <div className="headline">Account Details</div>
          <table style={{ width: "100%" }}>
            <tr>
              {" "}
              <td style={{ paddingBottom: "1em", textAlign: "left" }}>
                E-Mail:
              </td>
              <td style={{ paddingBottom: "1em", textAlign: "left" }}>
                {user.email}
              </td>
            </tr>
            <tr>
              {" "}
              <td style={{ paddingBottom: "1em", textAlign: "left" }}>
                Username:
              </td>
              <td style={{ paddingBottom: "1em", textAlign: "left" }}>
                {user.username}
              </td>
            </tr>
            {/*             <tr>
              {" "}
              <td style={{ paddingBottom: "1em", textAlign: "left" }}>
                Admin:
              </td>
              <td style={{ paddingBottom: "1em", textAlign: "left" }}>
                {user.admin}
              </td>
            </tr> */}
          </table>
          {backButtonElement}
          {editButtonElement}
        </div>
      </div>
    </>
  );
}

export default AccountDetails;
