import React from "react";
import Button from "../ui-common/Button";
import { useState } from "react";
import { URLs } from "../../App";
import { useContext } from "react";
import { GlobalContext } from "../../App";

function CreateGroupForm({ sendCreateRequest, toWorkspace }) {
  const [name, setName] = useState("");

  const { navigate } = useContext(GlobalContext);

  const addGroup = () => {
    console.log("add workplace");
    const url = "http://localhost:8000/workspace/addgroup/";
    const newGroup = {
      name,
    };
    const request = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(newGroup),
    };
    const sendPost = async () => {
      const response = await fetch(url, request).catch((error) =>
        console.error("There was an error!", error)
      );
      console.log(response);
      if (response.status === 201) {
        navigate(URLs.workspaceURL);
        console.log("success");
      }
    };
    sendPost();
  };

  return (
    <>
      <div className="form">
        <div className="headline">Create Group</div>{" "}
        <form>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
        </form>
        <Button title="Back" onClick={toWorkspace} />
        <Button title="Create Group" onClick={() => addGroup()} />
      </div>
    </>
  );
}

export default CreateGroupForm;
