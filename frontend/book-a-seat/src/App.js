import React, { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Welcome from "./components/main/Welcome";
import Header from "./components/main/Header";
import Footer from "./components/main/Footer";
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
import ForgotPassword from "./components/useraccount/ForgotPassword";

export const GlobalContext = createContext();

export const URLs = {
  welcomeURL: "/",
  loginURL: "/user/login",
  registerURL: "/user/register",
  userDetailsURL: "/user/details",
  overviewURL: "/overview",
  workspaceURL: "/workspace",
  userEditURL: "/user/details/edit",
  createGroupURL: "/workspace/create-group",
  createWorkspaceURL: "/workspace/create-workspace",
  reservationURL: "/reservation",
  forgotPasswordURL: "/user/forgotPassword",
};

function App() {
  const [user, setUser] = useState(() => {
    if (localStorage.getItem("token")) {
      const decodedTokenData = jwt_decode(localStorage.getItem("token"));
      const user = {
        username: decodedTokenData.username,
        email: decodedTokenData.email,
        id: decodedTokenData.user_id,
      };
      console.log(user);
      return user;
    } else {
      return null;
    }
  });
  const [token, setToken] = useState(() =>
    JSON.parse(localStorage.getItem("token"))
  );

  const userGuard = (userPresent) => !userPresent && navigate(URLs.loginURL);

  const guards = {
    userGuard,
  };

  const requests = {
    login,
    register,
    /*     updateUser, */
  };

  // TODO: remove toXY functions, replace with navigate(xy)
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

  const toForgotPassword = () => {
    navigate(URLs.forgotPasswordURL);
  };

  const login = ({ username, password }) => {
    const url = "http://34.141.109.26:8000/api/token/";
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
        console.log(user);
        setUser(user);
        setToken(token);
        localStorage.setItem("token", JSON.stringify(token));
        toOverview();
      }
    };
    getUser();
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    toLogin();
    localStorage.removeItem("token");
  };

  const register = (userData) => {
    const user = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      password2: userData.password,
    };
    const url = "http://34.141.109.26:8000/api/register/";
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
      if (response.status === 201) {
        toLogin();
      }
    };
    addUser();
  };

  const resetPasswordRequest = (email) => {
    const url = "http://34.141.109.26:8000/api/resetrequest/";
    const user = {
      email: "niklas.sumalvico@outlook.de",
    };
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
      if (response.status === 201) {
        toLogin();
      }
    };
    addUser();
  };

  const setNewPasswordRequest = (email, otp, newPassword) => {
    const user = {
      email: "niklas.sumalvico@outlook.de",
      otp: otp,
      password: newPassword,
    };
    const url = "http://34.141.109.26:8000/api/resetpassword/";
    const request = {
      method: "PUT",
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
      if (response.status === 201 || response.status === 200) {
        toLogin();
      }
    };
    addUser();
  };

  const addWorkspace = (data) => {
    console.log("create workspace", data);
  };

  const addGroup = (data) => {
    console.log("create group", data);
  };

  const welcomeElement = <Welcome toLogin={toLogin} />;
  const loginElement = (
    <LoginForm
      toRegister={toRegister}
      sendLoginRequest={login}
      toForgotPassword={toForgotPassword}
    />
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
      token={token}
    />
  );
  const reservationElement = <Reservation token={token} />;
  const accountEditElement = (
    <EditForm
      user={user}
      /*       sendUpdateRequest={updateUser} */
      toDetails={toDetails}
    />
  );
  const createWorkspaceElement = (
    <CreateWorkspaceForm
      sendCreateRequest={addWorkspace}
      toWorkspace={toWorkspace}
      token={token}
    />
  );
  const createGroupElement = (
    <CreateGroupForm
      sendCreateRequest={addGroup}
      toWorkspace={toWorkspace}
      token={token}
    />
  );
  const forgotPasswordElement = (
    <ForgotPassword
      toLogin={toLogin}
      forgotPassword={() => resetPasswordRequest("")}
      resetPassword={setNewPasswordRequest}
    />
  );

  const navigate = useNavigate();

  const contextData = {
    // TODO: make backend-requests globally available
    user,
    setUser,
    token,
    setToken,
    guards,
    navigate,
    logout,
  };

  return (
    <GlobalContext.Provider value={contextData}>
      <div className="main-container">
        <Header />
        <Routes>
          <Route path={URLs.welcomeURL} element={welcomeElement} />
          <Route path={URLs.loginURL} element={loginElement} />
          <Route path={URLs.registerURL} element={registerElement} />
          <Route path={URLs.userDetailsURL} element={accountDetailsElement} />
          <Route path={URLs.userEditURL} element={accountEditElement} />
          <Route path={URLs.overviewURL} element={overviewElement} />
          <Route path={URLs.reservationURL} element={reservationElement} />
          <Route path={URLs.workspaceURL} element={workspaceElement} />
          <Route
            path={URLs.createWorkspaceURL}
            element={createWorkspaceElement}
          />
          <Route
            path={URLs.createGroupURL}
            element={createGroupElement}
            toWorkspace={toWorkspace}
          />
          <Route
            path={URLs.forgotPasswordURL}
            element={forgotPasswordElement}
          />
        </Routes>
        <Footer />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
