import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/main/Welcome";
import Header from "./components/main/Header";
import Useraccount from "./components/useraccount/Useraccount";

function App() {
  const welcomeElement = <Welcome />;
  const useraccountElement = <Useraccount />;

  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={welcomeElement} />
          <Route path="/useraccount" element={useraccountElement} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
