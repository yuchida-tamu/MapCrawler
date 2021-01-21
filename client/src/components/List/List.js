import React from "react";
import Item from "./Item/Item";

const List = ({ places, showMyList, isMyList }) => {
  const items = places.map((place) => {
    return <Item key={place.place_id} place={place} isAdded={isMyList} />;
  });

  const listContainerStyle = showMyList ? "col" : "col s3";

  return (
    <div
      className={listContainerStyle}
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
