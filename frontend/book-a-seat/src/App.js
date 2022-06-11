import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Welcome from "./components/main/Welcome";
import Header from "./components/main/Header";
import AccountDetails from "./components/useraccount/AccountDetails";
import RegisterForm from "./components/useraccount/RegisterForm";
import LoginForm from "./components/useraccount/LoginForm";
import Overview from "./components/main/Overview";

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

  // TODO: replace with authentication
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
        setUser(userFromServer);
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
      const userData = await dispatchAddUserRequest(user);
      if (userData) {
        setUser(userData);
        toOverview();
      }
    };
    addUser();
  };

  const welcomeElement = <Welcome toLogin={toLogin} />;
  const loginElement = (
    <LoginForm toRegister={toRegister} sendLoginRequest={login} />
  );
  const registerElement = (
    <RegisterForm toLogin={toLogin} sendRegisterRequest={register} />
  );
  const accountDetailsElement = <AccountDetails user={user} />;
  const overviewElement = <Overview toUserDetails={toDetails} />;

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={welcomeElement} />
        <Route path="/user/login" element={loginElement} />
        <Route path="/user/register" element={registerElement} />
        <Route path="/user/details" element={accountDetailsElement} />
        <Route path="/overview" element={overviewElement} />
      </Routes>
    </>
  );
}

export default App;
