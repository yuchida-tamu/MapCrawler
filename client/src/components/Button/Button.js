import React from "react";

const Button = (props) => (
  <a className="waves-effect waves-light btn" onClick={props.click}>
    {props.children}
  </a>
);

export default Button;
