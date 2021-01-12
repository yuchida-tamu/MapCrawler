import React from "react";

const Form = (props) => {
  return (
    <form onSubmit={props.click}>
      <input type="text" name="search" placeholder="search by keywords..." />
    </form>
  );
};

export default Form;
