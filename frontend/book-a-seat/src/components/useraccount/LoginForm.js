import React, { useState } from "react";
import Button from "../ui-common/Button";
import "../main/Main.css"

function LoginForm({ toRegister, sendLoginRequest }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="form">
        <div className="headline">Login</div>
        <form>
          <div className="field">
            <label id="emailInput">Email address</label><br></br>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="field">
            <label id="passwordInput">Password</label><br></br>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
        </form>
        <br></br>
        <Button
          title="Login"
          onClick={() => sendLoginRequest({ email, password })}
        />
        <Button title="Register" onClick={toRegister} />
      </div>
    </>
  );
}

export default LoginForm;
