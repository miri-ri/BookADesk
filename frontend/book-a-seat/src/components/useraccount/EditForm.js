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
      <h2>Edit form!</h2>
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
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></input>
        </div>
      </form>
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
    </>
  );
}

export default EditForm;
