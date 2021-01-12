import React from "react";

const Item = (props) => {
  return (
    <li>
      <div>
        <h4>{props.name}</h4>
        <p>{props.address}</p>
      </div>
      }
    </li>
  );
};

export default Item;
