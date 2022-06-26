import React, { useState } from "react";
import Button from "../ui-common/Button";

function RegisterForm({ toLogin, sendRegisterRequest }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <>
      <div className="form">
        <div className="headline">Register</div>
        <form>
          <div className="field">
            <label>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div className="field">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          </div>
          <div className="field">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </div>
        </form>
        <br></br>
        <Button title="Back" onClick={toLogin} />
        <Button
          title="Register"
          onClick={() =>
            sendRegisterRequest({
              email,
              password,
              username,
              firstName,
              lastName,
            })
          }
        />
      </div>
    </>
  );
}

export default RegisterForm;
