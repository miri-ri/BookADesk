import React, { useState } from "react";
import Button from "../ui-common/Button";
import "../main/Main.css";

function ForgotPassword({ forgotPassword, resetPassword, toLogin }) {
  const [email, setEmail] = useState("");
  const [otp, setOpt] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [emailSend, setEmailSend] = useState(false);

  return (
    <>
      (
      {!emailSend ? (
        <div className="form">
          <div className="headline">Reset Your Password:</div>
          <form>
            <div className="field">
              <label>Email address</label>
              <input
                class="oneLineText"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
          </form>
          <br></br>
          <Button
            title="Send Email"
            onClick={() => {
              //if (email) {
              setEmailSend(true);
              forgotPassword(email);
              //}
            }}
          />
          <Button title="Back" onClick={toLogin} />
        </div>
      ) : (
        <div className="form">
          <div className="headline">Set New Password:</div>
          <form>
            <div className="field">
              <label>Code</label>
              <input
                class="oneLineText"
                type="text"
                value={otp}
                onChange={(e) => setOpt(e.target.value)}
              ></input>
            </div>
            <div className="field">
              <label>New Password</label>
              <input
                class="oneLineText"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              ></input>
            </div>
          </form>
          <br></br>
          <Button
            title="Send Email"
            onClick={() => resetPassword(email, otp, newPassword)}
          />
          <Button title="Back" onClick={toLogin} />
        </div>
      )}
      )
    </>
  );
}

export default ForgotPassword;
