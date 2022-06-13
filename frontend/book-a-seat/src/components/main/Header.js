import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const accountButton = (
    <button
      type="button"
      class="menu-button"
      onClick={() => navigate("/useraccount")}
    >
      Account
    </button>
  );
  const ReservationsButton = (
    <button
      type="button"
      class="menu-button"
      onClick={() => navigate("/reservation")}
    >
      Reservations
    </button>
  );

  const navigate = useNavigate();

  return (
    <>
      <div className="header">
        <div className="header-left">
          <h2>Book a Desk</h2>
        </div>
        {/*           <div class="header-right">
            <div class="btn-group" role="group">
                {accountButton}
                {ReservationsButton}
            </div>
          </div> */}
      </div>
    </>
  );
}

export default Header;
