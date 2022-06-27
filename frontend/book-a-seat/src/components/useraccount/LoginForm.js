import React, { useState } from "react";
import Button from "../ui-common/Button";
import "../main/Main.css";

function LoginForm({ toRegister, sendLoginRequest }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="form">
        <div className="headline">Login</div>
        <form>
          <div className="field">
            <label id="usernameInput">Username</label>
            <br></br>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div className="field">
            <label id="passwordInput">Password</label>
            <br></br>
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
          onClick={() => sendLoginRequest({ username, password })}
        />
        <Button title="Register" onClick={toRegister} />
      </div>
    </>
  );
}

export default LoginForm;
