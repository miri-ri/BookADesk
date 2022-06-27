import React from "react";
import Button from "../ui-common/Button";
import { useState } from "react";
import { URLs } from "../../App";
import { useContext } from "react";
import { GlobalContext } from "../../App";

function CreateWorkspaceForm({ sendCreateRequest, toWorkspace }) {
  // TODO: save workspace state in one object (analog in other Components)
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  // TODO: add isBarrierFree, hasComputer
  const [comment, setComment] = useState("");

  const { navigate } = useContext(GlobalContext);

  const addWorkspace = () => {
    console.log("add workplace");
    const url = "http://localhost:8000/workspace/add/";
    const newWorkspace = {
      name,
      group,
      comment,
      is_barrier_free: false,
      has_computer: false,
    };
    const request = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(newWorkspace),
    };
    const sendPost = async () => {
      const response = await fetch(url, request).catch((error) =>
        console.error("There was an error!", error)
      );
      console.log(response);
      if (response.status === 201) {
        console.log("success");
        navigate(URLs.workspaceURL);
      }
    };
    sendPost();
  };

  // TODO: groups as dropdown selection
  return (
    <>
      <div className="form">
        <div className="headline">Create Workplace</div>{" "}
        <form>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="field">
            <label>Group</label>
            <input
              type="text"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            ></input>
          </div>
          <div className="field">
            <label>Comment</label>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></input>
          </div>
        </form>
        <Button title="Back" onClick={toWorkspace} />
        <Button title="Create Workspace" onClick={() => addWorkspace()} />
      </div>
    </>
  );
}

export default CreateWorkspaceForm;
