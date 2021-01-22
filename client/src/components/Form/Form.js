import React from "react";

const Form = ({ click, name, placeholder }) => {
  return (
    <form onSubmit={click}>
      <input type="text" name={name} placeholder={placeholder} />
    </form>
  );
};

export default Form;
