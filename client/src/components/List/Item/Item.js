import React from "react";

const Item = (props) => {
  return (
    <li className="collection-item">
      <div className="card">
        <div className="card-content">
          <h4 className="card-title is-4">{props.name}</h4>
          <p>{props.address}</p>
        </div>
      </div>
    </li>
  );
};

export default Item;
