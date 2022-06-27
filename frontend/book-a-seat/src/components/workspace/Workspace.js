import React from "react";
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
          {dummyWorkspaces.map(({ name, group, info }) => (
            <tr>
              <td>{name}</td>
              <td>{group}</td>
              <td>{info.comment}</td>
              <td>{info.isBarrierFree ? "Yes" : "No"}</td>
              <td>{info.hasComputer ? "Yes" : "No"}</td>
            </tr>
          ))}
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
          {dummyGroups.map(({ name }) => (
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
