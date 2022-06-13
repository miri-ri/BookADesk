import React from "react";
import Button from "../ui-common/Button";
import { useState } from "react";

function CreateGroupForm({ sendCreateRequest, toWorkspace }) {
  const [name, setName] = useState("");

  return (
    <>
      <h2>Create group form!</h2>
      <form>
        <div>
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
    </>
  );
}

export default CreateGroupForm;
