import React, { useState } from "react";
import Button from "../ui-common/Button";

function RegisterForm({ toLogin, sendRegisterRequest }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  return (
    <>
      <h2>Register:</h2>
      <form>
        <div>
          <label>Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
      </form>
      <Button title="Back" onClick={toLogin} />
      <Button
        title="Register"
        onClick={() =>
          sendRegisterRequest({
            email,
            password,
            username,
          })
        }
      />
    </>
  );
}

export default RegisterForm;
