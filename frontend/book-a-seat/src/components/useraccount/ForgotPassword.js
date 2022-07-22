import React, { useState } from "react";
import Button from "../ui-common/Button";
import "../main/Main.css";

function ForgotPassword({ forgotPassword, toLogin }) {
  const [email, setEmail] = useState("");

  return (
    <>
      <div className="form">
        <div className="headline">Login</div>
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
        <Button title="Send Email" onClick={forgotPassword} />
        <Button title="Back" onClick={toLogin} />
      </div>
    </>
  );
}

export default ForgotPassword;
