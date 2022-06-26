import React, { useState } from "react";
import Button from "../ui-common/Button";

function LoginForm({ toRegister, sendLoginRequest }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <h2>login form!</h2>
      <form>
        <div>
          <label id="emailInput">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        onClick={() => sendLoginRequest({ email, password })}
      />
      <Button title="Register" onClick={toRegister} />
    </>
  );
}

export default LoginForm;
