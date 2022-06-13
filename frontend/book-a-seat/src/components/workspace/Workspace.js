import React from "react";
import Button from "../ui-common/Button";

// TODO: alter model in backend
const dummyGroups = [
  {
    // unique
    name: "table 01",
  },
];

const dummyWorkspaces = [
  {
    name: "seat 1",
    group: "table 01",
    info: {
      comment: undefined,
      isBarrierFree: false,
      hasComputer: false,
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
  const workspaceTableElement = null;
  const groupTableElement = null;

  return (
    <>
      <p>Workspace:</p>
      {addWorkspaceButtonElement}
      {addGroupButtonElement}
      {backButtonElement}
    </>
  );
}

export default Workspace;
