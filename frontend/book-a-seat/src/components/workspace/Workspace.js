import React, { useEffect, useState } from "react";
import Button from "../ui-common/Button";

// TODO: alter model in backend
const dummyGroups = [
  {
    // unique
    name: "table 01",
  },
  {
    name: "room 01",
  },
  {
    name: "room 02",
  },
];

const dummyWorkspaces = [
  {
    name: "seat 01",
    group: "table 01",
    info: {
      comment: "normal workspace",
      isBarrierFree: false,
      hasComputer: false,
    },
  },
  {
    name: "seat 02",
    group: "table 01",
    info: {
      comment: "normal workspace",
      isBarrierFree: false,
      hasComputer: false,
    },
  },
  {
    name: "seat 03",
    group: "table 01",
    info: {
      comment: "normal workspace",
      isBarrierFree: false,
      hasComputer: false,
    },
  },
  {
    name: "seat 04",
    group: "room 01",
    info: {
      comment: "room space",
      isBarrierFree: false,
      hasComputer: true,
    },
  },
];

function Workspace({ toCreateGroup, toCreateWorkspace, toOverview }) {
  const getWorkspaces = () => {
    console.log("get workplaces");
    const url = "http://localhost:8000/workspace/";
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
        return await response.json();
      }
    };
    return sendGet();
  };

  const getGroups = () => {
    console.log("get groups");
    const url = "http://localhost:8000/workspace/groups";
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
        return await response.json();
      }
    };
    return sendGet();
  };
  const [workspaces, setWorkspaces] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const setInitialValuses = async () => {
      console.log("set initial values");
      setWorkspaces(await getWorkspaces());
      setGroups(await getGroups());
    };
    setInitialValuses();
  }, []);

  const addWorkspaceButtonElement = (
    <Button title="Create Workspace" onClick={toCreateWorkspace} />
  );
  const addGroupButtonElement = (
    <Button title="Create Group" onClick={toCreateGroup} />
  );
  const backButtonElement = <Button title="Back" onClick={toOverview} />;
  const workspaceTableElement = (
    <>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Group</th>
            <th scope="col">Comment</th>
            <th scope="col">Is Barrier Free</th>
            <th scope="col">Has Computer</th>
          </tr>
        </thead>
        <tbody>
          {workspaces.map(
            ({ name, comment, is_barrier_free, has_computer, group }) => (
              <tr>
                <td>{name}</td>
                <td>{group}</td>
                <td>{comment}</td>
                <td>{is_barrier_free ? "Yes" : "No"}</td>
                <td>{has_computer ? "Yes" : "No"}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
  const groupTableElement = (
    <>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          {groups.map(({ name }) => (
            <tr>
              <td>{name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  return (
    <>
      <div className="body">
        <h4>Workspaces</h4>
        {workspaceTableElement}
        <br></br>
        <h4>Groups</h4>
        {groupTableElement}
        <br></br>
        {addWorkspaceButtonElement}
        {addGroupButtonElement}
        {backButtonElement}
      </div>
    </>
  );
}

export default Workspace;
