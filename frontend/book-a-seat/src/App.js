import React, { useState } from "react";
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
import jwt_decode from "jwt-decode";

function App() {
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");

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

  const login = ({ username, password }) => {
    const url = "http://localhost:8000/api/token/";
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        username,
        password,
      }),
    };
    const getUser = async () => {
      const fetchToken = async () => {
        const response = await fetch(url, request).catch((error) =>
          console.error("There was an error!", error)
        );
        if (response.status === 200) {
          return await response.json();
        } else {
          return null;
        }
      };
      const token = await fetchToken();
      if (token) {
        const decodedTokenData = jwt_decode(token.access);
        const user = {
          username: decodedTokenData.username,
          email: decodedTokenData.email,
          id: decodedTokenData.user_id,
        };
        setUser(user);
        toOverview();
      }
    };
    getUser();
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    toLogin();
  };

  const register = (userData) => {
    const user = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      password2: userData.password,
    };
    const url = "http://localhost:8000/api/register/";
    const request = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(user),
    };
    const addUser = async () => {
      const response = await fetch(url, request).catch((error) =>
        console.error("There was an error!", error)
      );
      // TODO: add might be a different status code
      if (response.status === 200) {
        toLogin();
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
      logout={logout}
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
