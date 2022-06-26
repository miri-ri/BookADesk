import React from "react";

function Button({ title, onClick, style = "classic" }) {
  const styleClasses = "m-1 btn btn-" + style;
  return (
    <button className={styleClasses} onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;
