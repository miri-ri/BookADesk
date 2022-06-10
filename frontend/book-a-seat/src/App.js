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

const dummyUser = {
  email: "someting@gmail.com",
  password: "password",
  username: "flo123",
  firstName: "Florian",
  lastName: "Vogel",
  admin: "false",
};

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

  const sendLoginRequest = ({ email, password }) => {
    console.log("todo: send login request:", email, password);
    setUser(dummyUser);
    toOverview();
  };

  const sendRegisterRequest = (userData) => {
    console.log("todo: send register request:", userData);
    setUser(userData);
    toOverview();
  };

  const welcomeElement = <Welcome toLogin={toLogin} />;
  const loginElement = (
    <LoginForm toRegister={toRegister} sendLoginRequest={sendLoginRequest} />
  );
  const registerElement = (
    <RegisterForm toLogin={toLogin} sendRegisterRequest={sendRegisterRequest} />
  );
  const accountDetailsElement = <AccountDetails user={user} />;
  const overviewElement = <Overview toUserDetails={toDetails} />;

  const navigate = useNavigate();

  const reservationElement = <Reservation />

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={welcomeElement} />
        <Route path="/user/login" element={loginElement} />
        <Route path="/user/register" element={registerElement} />
        <Route path="/user/details" element={accountDetailsElement} />
        <Route path="/overview" element={overviewElement} />
        <Route path="/reservation" element={reservationElement} />
      </Routes>
    </>
  );
}

export default App;
