import React from "react";
import Button from "../ui-common/Button";
import { useState } from "react";
import useAxios from "../../utils/useAxios";
import { GlobalContext } from "../../App";
import { useContext } from "react";

function EditForm({ toDetails }) {
  const { user, setUser, logout } = useContext(GlobalContext);
  console.log(user);

  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);

  /*   const api = useAxios(); */
  const updateUser = (userData) => {
    console.log("update", userData);
    const updatedUser = {
      username: userData.username,
      email: userData.email,
    };
    const url = "http://localhost:8000/api/user/" + user.id + "/";
    const request = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(updatedUser),
    };
    const sendUpdate = async () => {
      const response = await fetch(url, request).catch((error) =>
        console.error("There was an error!", error)
      );
      if (response.status === 200) {
        console.log("success");
        setUser({ ...user, ...updatedUser });
        console.log("user:", user);
        /*         getUser(); */
        logout();
      }
    };
    sendUpdate();
  };

  /*   const getUser = () => {
    console.log("get user");
    const url = "http://localhost:8000/api/user/" + user.id;
    const request = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      mode: "cors",
    };
    const sendGet = async () => {
      const response = await fetch(url, request).catch((error) =>
        console.error("There was an error!", error)
      );
      console.log(response);
      if (response.status === 200) {
        console.log("success");
      }
    };
    sendGet();
  }; */

  return (
    <>
      <div className="form">
        <div className="headline">Edit Account</div>
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
          <div className="field">
            <label>Username</label>
            <input
              class="oneLineText"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
        </form>
        <br></br>
        <Button title="Back" onClick={toDetails} />
        <Button
          title="Apply Changes"
          onClick={() =>
            updateUser({
              email,
              username,
            })
          }
        />
      </div>
    </>
  );
}

export default EditForm;
