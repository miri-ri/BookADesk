import React from "react";
import Button from "../ui-common/Button";
import { useState } from "react";

function EditForm({ user, sendUpdateRequest, toDetails }) {
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [username, setUsername] = useState(user.username);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  return (
    <>
      <div className="form">
      <div className="headline">Edit</div>
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
      <Button title="Back" onClick={toDetails} />
      <Button
        title="Apply Changes"
        onClick={() =>
          sendUpdateRequest({
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

export default EditForm;
