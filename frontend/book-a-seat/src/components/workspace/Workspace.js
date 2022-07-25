import React, { createContext, useContext, useEffect, useState } from "react";
import { GlobalContext, URLs } from "../../App";
import Button from "../ui-common/Button";
import EditWorkspaceForm from "./EditWorkspaceForm";
import EditGroupForm from "./EditGroupForm";

function Workspace({ toCreateGroup, toCreateWorkspace, toOverview, token }) {
  const { navigate } = useContext(GlobalContext);
  const editWorkspaceURL = "/edit-workspace/";

  const getWorkspaces = () => {
    console.log("get workplaces");
    console.log(token);
    const url = "http://localhost:8000/workspace/";
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

  const toEditWorkspace = () => {
    navigate("workspace" + editWorkspaceURL);
  };

  const deleteWorkspace = (id) => {
    console.log("delete workplaces");
    console.log(token);
    const url = "http://localhost:8000/workspace/delete/" + id + "/";
    const request = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
      mode: "cors",
    };
    const sendDelete = async () => {
      const response = await fetch(url, request).catch((error) =>
        console.error("There was an error!", error)
      );
      console.log(response);
      console.log(response);
      if (response.status === 200) {
        console.log("success");
        return await response.json();
      }
    };
    return sendDelete();
  };

  const getGroups = () => {
    console.log("get groups");
    console.log(token);
    const url = "http://localhost:8000/workspace/group";
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

  const deleteGroup = (id) => {
    console.log("delete group");
    console.log(token);
    const url = "http://localhost:8000/workspace/group/delete/" + id + "/";
    const request = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
      mode: "cors",
    };
    const sendDelete = async () => {
      const response = await fetch(url, request).catch((error) =>
        console.error("There was an error!", error)
      );
      console.log(response);
      if (response.status === 200) {
        console.log("success");
        return await response.json();
      }
    };
    return sendDelete();
  };

  const [workspaces, setWorkspaces] = useState([]);
  const [groups, setGroups] = useState([]);
  const [mode, setMode] = useState("overview");
  const [workspaceToEdit, setWorkspaceToEdit] = useState({});
  const [groupToEdit, setGroupToEdit] = useState({});

  const setInitialValuses = async () => {
    const temp = await getWorkspaces();
    console.log(temp);
    setWorkspaces(temp);
    const groupTemp = await getGroups();
    setGroups(groupTemp);
  };

  useEffect(() => {
    setInitialValuses();
  }, []);

  const addWorkspaceButtonElement = (
    <Button
      title="Create Workspace"
      onClick={() => groups.length > 0 && toCreateWorkspace()}
    />
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
            <th scope="col" style={{lineHeight: "15px"}}>Is Barrier Free</th>
            <th scope="col" style={{lineHeight: "15px"}}>Has Computer</th>
            <th scope="col">Rating</th>
          </tr>
        </thead>
        <tbody>
          {workspaces &&
            workspaces.map(
              ({
                id,
                name,
                comment,
                is_barrier_free,
                has_computer,
                group,
                workspace_rating,
              }) => (
                <tr>
                  <td>{name}</td>
                  <td>{group}</td>
                  <td style={{lineHeight: "15px"}}>{comment}</td>
                  <td>{is_barrier_free ? "Yes" : "No"}</td>
                  <td>{has_computer ? "Yes" : "No"}</td>
                  <td>{workspace_rating}</td>
                  <td>
                    <Button
                      onClick={() => {
                        deleteWorkspace(id).then(() => setInitialValuses());
                      }}
                      title="x"
                      style="delete"
                    />
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        setWorkspaceToEdit({
                          id,
                          name,
                          comment,
                          is_barrier_free,
                          has_computer,
                          group,
                        });
                        setMode("workspaceEdit");
                      }}
                      title={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                      }
                      style="edit"
                    ></Button>
                  </td>
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
          {groups &&
            groups.map(({ id, name }) => (
              <tr>
                <td>{name}</td>
                <td>
                  <Button
                    onClick={() => {
                      deleteGroup(id).then(setInitialValuses);
                    }}
                    title="x"
                    style="delete"
                  />
                </td>
                <td>
                  <Button
                    onClick={() => {
                      //editGroup(id);
                      setGroupToEdit({ id, name });
                      setMode("groupEdit");
                    }}
                    title={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                    }
                    style="edit"
                  ></Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );

  const workspaceOverviewElement = (
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
  );

  const workspaceEditElement = (
    <EditWorkspaceForm
      token={token}
      workspace={workspaceToEdit}
      toWorkspace={() => {
        setMode("overview");
        setInitialValuses();
      }}
    />
  );
  const groupEditElement = (
    <EditGroupForm
      token={token}
      group={groupToEdit}
      toWorkspace={() => {
        setMode("overview");
        setInitialValuses();
      }}
    />
  );

  return (
    <>
      {mode === "workspaceEdit"
        ? workspaceEditElement
        : mode === "groupEdit"
        ? groupEditElement
        : workspaceOverviewElement}
    </>
  );
}

export default Workspace;
