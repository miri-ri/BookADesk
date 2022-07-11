import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <>
      <div class="footer">
        <div class="footer-left">
          <p>Copyright © 2022</p>
        </div>
        <div class="footer-right">
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.7/css/all.css"></link>
          <p>
            <button type="button" class="btn" onClick={""}>
              <i class="fa fa-address-card"></i> Impressum
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
export default Footer;
