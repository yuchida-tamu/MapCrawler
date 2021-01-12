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

  return <ul>{items}</ul>;
};

export default List;
