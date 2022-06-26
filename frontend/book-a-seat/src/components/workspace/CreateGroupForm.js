import React from "react";
import Button from "../ui-common/Button";
import { useState } from "react";

function CreateGroupForm({ sendCreateRequest, toWorkspace }) {
  const [name, setName] = useState("");

  return (
    <>
    <div className="form">
      <div className="headline">Create Group</div>
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
      <Button
        title="Create Workspace"
        onClick={() =>
          sendCreateRequest({
            name,
          })
        }
      />
    </div>
    </>
  );
}

export default CreateGroupForm;
