import React from "react";
import Button from "../../Button/Button";
import { Context } from "../../../context/context";

const Item = ({ place }) => {
  const { name, formatted_address } = place;

  return (
    <li key className="collection-item">
      <div className="card">
        <div className="card-content">
          <h4 className="card-title ">{name}</h4>
          <p>{formatted_address}</p>
        </div>
        <div className="card-action">
          <Context.Consumer>
            {(context) => {
              return place.isAdded ? (
                <Button
                  click={() => {
                    context.removeFromList(place);
                  }}
                  isRemove={true}
                >
                  REMOVE
                </Button>
              ) : (
                <Button
                  click={() => {
                    context.addToList(place);
                  }}
                  isRemove={false}
                >
                  ADD
                </Button>
              );
            }}
          </Context.Consumer>
        </div>
      </div>
    </li>
  );
};

export default Item;
