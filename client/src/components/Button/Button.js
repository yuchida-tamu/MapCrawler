import React from "react";

const Button = (props) => {
  const style = props.isRemove
    ? "waves-effect waves-light btn red"
    : "waves-effect waves-light btn";
  return (
    <a className={style} onClick={props.click}>
      {props.children}
    </a>
  );
};

export default Button;
