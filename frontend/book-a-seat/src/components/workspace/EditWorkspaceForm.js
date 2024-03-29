import React, { useEffect, useState } from "react";
import Button from "../ui-common/Button";
import { URLs } from "../../App";
import { useContext } from "react";
import { GlobalContext } from "../../App";

function EditWorkspaceForm({ toWorkspace, workspace, token }) {
  // TODO: save workspace state in one object (analog in other Components)
  console.log("initial workplace state: ", workspace);
  const [name, setName] = useState(workspace.name);
  const [group, setGroup] = useState(workspace.group);
  // TODO: add isBarrierFree, hasComputer
  const [comment, setComment] = useState(workspace.comment);
  const [hasComputer, setHasComputer] = useState(workspace.has_computer);
  const [isBarrierFree, setIsBarrierFree] = useState(workspace.is_barrier_free);

  const { navigate } = useContext(GlobalContext);

  const getGroups = () => {
    console.log("get groups");
    console.log(token);
    const url = "http://34.141.109.26:8000/workspace/group";
    const request = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
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
        return await response.json();
      }
    };
    return sendGet();
  };

  const editWorkspace = () => {
    console.log("edit workplace");
    const url = "http://34.141.109.26:8000/workspace/edit/" + workspace.id + "/";
    const newWorkspace = {
      name,
      group,
      comment: comment || "no comment",
      is_barrier_free: isBarrierFree,
      has_computer: hasComputer,
    };
    console.log(newWorkspace);
    const request = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
      mode: "cors",
      body: JSON.stringify(newWorkspace),
    };
    const sendPost = async () => {
      const response = await fetch(url, request).catch((error) =>
        console.error("There was an error!", error)
      );
      console.log(response);
      if (response.status === 200) {
        console.log("success");
        toWorkspace();
      }
    };
    sendPost();
  };

  const [groups, setGroups] = useState([]);

  const setInitialValuses = async () => {
    setGroups(await getGroups());
  };

  useEffect(() => {
    setInitialValuses();
  }, []);

  console.log(group);
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
          <div class="field">
            <label>Group</label>
            <select
              className="form-control"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            >
              {groups && groups.map(({ name }) => <option>{name}</option>)}
            </select>
          </div>
          <div class="form-check field p-0 pt-3">
            <label className="form-check-label">Is Barrier Free</label>
            <input
              className="form-check-input mt-3"
              type="checkbox"
              checked={isBarrierFree}
              onChange={(e) => setIsBarrierFree(e.target.checked)}
            ></input>
          </div>
          <div class="form-check field p-0">
            <label className="form-check-label">Has Computer</label>
            <input
              className="form-check-input mt-3"
              type="checkbox"
              checked={hasComputer}
              onChange={(e) => setHasComputer(e.target.checked)}
            ></input>
          </div>
          <div className="field pt-3">
            <label>Comment</label>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></input>
          </div>
        </form>
        <Button title="Back" onClick={toWorkspace} />
        <Button title="Edit Workspace" onClick={() => editWorkspace()} />
      </div>
    </>
  );
}

export default EditWorkspaceForm;
