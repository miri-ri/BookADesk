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

  // TODO: respace with authentication
  const fetchToken = async (username, password) => {
    const res = await fetch("http://localhost:8000/api/token/", {
      /* TODO: GET? */
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const token = await res.json();

    if (res.status === 200) {
      setToken(token);
    } else {
      console.log("error fetching jwt-token");
    }
    return token;
  };

  // TODO: error handling
  const login = ({ username, password }) => {
    const getUser = async () => {
      const token = await fetchToken(username, password);
      if (token) {
        console.log(token);
        const decodedUser = jwt_decode(token.access);
        console.log("successful login:", token, decodedUser);
        setUser({
          username: decodedUser.username,
          email: decodedUser.email,
          id: decodedUser.user_id,
        });
        toOverview();
      } else {
        console.log("an error occured loggin in");
      }
    };
    getUser();
  };

  // TODO: pass to component
  const logout = () => {
    setUser(null);
    setToken(null);
    toLogin();
  };

  const dispatchAddUserRequest = async (user) => {
    const res = await fetch("http://localhost:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(user),
    });
    console.log(res);
    if (res.status === 200) {
      toLogin();
    } else {
      console.log("an error occured during registration");
    }
  };

  const register = (userData) => {
    const user = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      password2: userData.password,
    };
    console.log(user);
    const addUser = async () => {
      await dispatchAddUserRequest(user);
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
