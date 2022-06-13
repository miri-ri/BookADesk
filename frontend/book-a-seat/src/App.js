import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Welcome from "./components/main/Welcome";
import Header from "./components/main/Header";
import AccountDetails from "./components/useraccount/AccountDetails";
import RegisterForm from "./components/useraccount/RegisterForm";
import LoginForm from "./components/useraccount/LoginForm";
import Overview from "./components/main/Overview";
import Reservation from "./components/reservations/Reservation";
import Workspace from "./components/workspace/Workspace";
import EditForm from "./components/useraccount/EditForm";
import CreateWorkspaceForm from "./components/workspace/CreateWorkspaceForm";
import CreateGroupForm from "./components/workspace/CreateGroupForm";

function App() {
  const [user, setUser] = useState("");

  const toLogin = () => {
    navigate("/user/login");
  };

  const toRegister = () => {
    navigate("/user/register");
  };

  const toDetails = () => {
    navigate("/user/details");
  };

  const toOverview = () => {
    navigate("/overview");
  };

  const toWorkspace = () => {
    navigate("/workspace");
  };

  const toEdit = () => {
    navigate("/user/details/edit");
  };

  const toCreateGroup = () => {
    navigate("/workspace/create-group");
  };

  const toCreateWorkspace = () => {
    navigate("/workspace/create-workspace");
  };

  const toReservation = () => {
    navigate("/reservation");
  };

  // TODO: respace with authentication
  const fetchUserByID = async (id) => {
    const res = await fetch("http://localhost:8000/users/users/" + id);
    const userData = await res.json();
    return userData;
  };

  // TODO: error handling
  const login = ({ email, password }) => {
    let userID = 2;
    const getUser = async () => {
      const userFromServer = await fetchUserByID(userID);
      if (userFromServer) {
        console.log("successful login:", userFromServer);
        setUser({
          firstName: userFromServer.first_name,
          lastName: userFromServer.last_name,
          username: userFromServer.username,
          email: userFromServer.email,
        });
        toOverview();
      } else {
        console.log("an error occured loggin in");
      }
    };
    getUser();
  };

  const dispatchAddUserRequest = async (user) => {
    const res = await fetch("http://localhost:8000/users/users/", {
      method: "POST",
      // headers: {
      //   "Content-type": "application/json",
      // },
      body: JSON.stringify(user),
    });
    console.log(res);
    const userData = await res.json();
    console.log(userData);
    return userData;
  };

  const register = (userData) => {
    const user = {
      first_name: userData.firstName,
      last_name: userData.lastName,
      username: userData.username,
      email: userData.email,
      // password: userData.password
      // admin: false,
    };
    console.log(user);
    const addUser = async () => {
      const userFromServer = await dispatchAddUserRequest(user);
      if (userFromServer) {
        console.log("successful login:", userFromServer);
        setUser({
          firstName: userFromServer.first_name,
          lastName: userFromServer.last_name,
          username: userFromServer.username,
          email: userFromServer.email,
        });
        toOverview();
      } else {
        console.log("an error occured during registration");
      }
    };
    addUser();
  };

  const updateUser = (userData) => {
    console.log("update", userData);
  };

  const addWorkspace = (data) => {
    console.log("create workspace", data);
  };

  const addGroup = (data) => {
    console.log("create group", data);
  };

  const welcomeElement = <Welcome toLogin={toLogin} />;
  const loginElement = (
    <LoginForm toRegister={toRegister} sendLoginRequest={login} />
  );
  const registerElement = (
    <RegisterForm toLogin={toLogin} sendRegisterRequest={register} />
  );
  const accountDetailsElement = (
    <AccountDetails user={user} toOverview={toOverview} toEdit={toEdit} />
  );
  const overviewElement = (
    <Overview
      toUserDetails={toDetails}
      toWorkspace={toWorkspace}
      toReservation={toReservation}
      toOverview={toOverview}
    />
  );
  const workspaceElement = (
    <Workspace
      toCreateGroup={toCreateGroup}
      toCreateWorkspace={toCreateWorkspace}
      toOverview={toOverview}
    />
  );
  const reservationElement = <Reservation />;
  const accountEditElement = (
    <EditForm
      user={user}
      sendUpdateRequest={updateUser}
      toDetails={toDetails}
    />
  );
  const createWorkspaceElement = (
    <CreateWorkspaceForm
      sendCreateRequest={addWorkspace}
      toWorkspace={toWorkspace}
    />
  );
  const createGroupElement = (
    <CreateGroupForm sendCreateRequest={addGroup} toWorkspace={toWorkspace} />
  );

  const navigate = useNavigate();

  return (
    <div className="main-container">
      <Header />
      <Routes>
        <Route path="/" element={welcomeElement} />
        <Route path="/user/login" element={loginElement} />
        <Route path="/user/register" element={registerElement} />
        <Route path="/user/details" element={accountDetailsElement} />
        <Route path="/user/details/edit" element={accountEditElement} />
        <Route path="/overview" element={overviewElement} />
        <Route path="/reservation" element={reservationElement} />
        <Route path="/workspace" element={workspaceElement} />
        <Route
          path="/workspace/create-workspace"
          element={createWorkspaceElement}
        />
        <Route
          path="/workspace/create-group"
          element={createGroupElement}
          toWorkspace={toWorkspace}
        />
      </Routes>
    </div>
  );
}

export default App;
