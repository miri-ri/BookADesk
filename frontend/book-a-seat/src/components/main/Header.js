import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const overviewButton = (
    <button
      type="button"
      class="menu-button"
      onClick={() => navigate("/overview")}
    >
      Overview
    </button>
  );

  const navigate = useNavigate();

  return (
    <>
      <div className="header">
        <div className="header-left">
          <h2><a href="/" style={{ color: "inherit", textDecoration:"none"}} onClick={() => navigate("")}>Book A Desk</a></h2>
        </div>
        {<div class="header-right">
            <div class="btn-group" role="group">
                {overviewButton}
            </div>
          </div>}
      </div>
    </>
  );
}

export default Header;
