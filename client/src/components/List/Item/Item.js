import React from "react";
import Button from "../../Button/Button";
import { Context } from "../../../context/context";

const Item = (props) => {
  const { name, formatted_address } = props.place;

  return (
    <li className="collection-item">
      <div className="card">
        <div className="card-content">
          <h4 className="card-title ">{name}</h4>
          <p>{formatted_address}</p>
        </div>
        <div className="card-action">
          <Context.Consumer>
            {(context) => (
              <Button click={() => context.addToList(props.place)}>ADD</Button>
            )}
          </Context.Consumer>
        </div>
      </div>
    </li>
  );
};

export default Item;
