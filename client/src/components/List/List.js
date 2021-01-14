import React from "react";
import Item from "./Item/Item";

const List = ({ places }) => {
  const items = places.map((place) => (
    <Item
      key={place.place_id}
      name={place.name}
      address={place.formatted_address}
    />
  ));

  return (
    <div
      className="col s3"
      style={{ padding: "0", margin: "0", height: "100%" }}
    >
      <ul
        className="　collection"
        style={{
          padding: "0",
          margin: "0",
          height: "100%",
          overflow: "scroll",
        }}
      >
        {items}
      </ul>
    </div>
  );
};

export default List;
