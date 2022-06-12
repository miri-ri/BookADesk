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
import Workplace from "./components/workplace/Workplace";
import EditForm from "./components/useraccount/EditForm";

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

  const toWorkplace = () => {
    navigate("/workplace");
  };

  const toEdit = () => {
    navigate("/user/details/edit");
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

  const update = (userData) => {
    console.log("update", userData);
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
      toWorkplace={toWorkplace}
      toOverview={toOverview}
    />
  );
  const workplaceElement = <Workplace />;
  const reservationElement = <Reservation />;
  const accountEditElement = (
    <EditForm user={user} sendUpdateRequest={update} toDetails={toDetails} />
  );

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={welcomeElement} />
        <Route path="/user/login" element={loginElement} />
        <Route path="/user/register" element={registerElement} />
        <Route path="/user/details" element={accountDetailsElement} />
        <Route path="/user/details/edit" element={accountEditElement} />
        <Route path="/overview" element={overviewElement} />
        <Route path="/reservation" element={reservationElement} />
        <Route path="/workplace" element={workplaceElement} />
      </Routes>
    </>
  );
}

export default App;
