import React from "react";

function Button({ title, onClick }) {
  return <button className="m-1" onClick={onClick}>{title}</button>;
}

export default Button;
