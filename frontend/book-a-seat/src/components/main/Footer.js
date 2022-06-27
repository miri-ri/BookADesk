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
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
          ></link>
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
