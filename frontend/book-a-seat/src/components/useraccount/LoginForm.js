import React, { useState } from "react";
import Button from "../ui-common/Button";

function LoginForm({ toRegister, sendLoginRequest }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <h2>Login:</h2>
      <form>
        <div>
          <label id="usernameInput">Username</label>
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div>
          <label id="passwordInput">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
      </form>
      <Button
        title="Login"
        onClick={() => sendLoginRequest({ username, password })}
      />
      <Button title="Register" onClick={toRegister} />
    </>
  );
}

export default LoginForm;
