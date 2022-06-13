import React from "react";
import Button from "../ui-common/Button";
import { useState } from "react";

function CreateWorkspaceForm({ sendCreateRequest, toWorkspace}) {
  // TODO: save workspace state in one object (analog in other Components)
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  // TODO: add isBarrierFree, hasComputer
  const [comment, setComment] = useState("");

  // TODO: groups as dropdown selection
  return (
    <>
      <h2>Create workspace form!</h2>
      <form>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Group</label>
          <input
            type="text"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Comment</label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></input>
        </div>
      </form>
      <Button title="Back" onClick={toWorkspace} />
      <Button
        title="Create Workspace"
        onClick={() =>
          sendCreateRequest({
            name,
            group,
            info: {
              comment,
            },
          })
        }
      />
    </>
  );
}

export default CreateWorkspaceForm;
