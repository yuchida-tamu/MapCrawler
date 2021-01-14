import React from "react";
import classes from "./Marker.module.css";

const Marker = ({ name, icon, types }) => {
  const genre = types.map((type) => <p>{type}</p>);

  return (
    <div
      className={classes.Marker}
      style={{ fontSize: "3em", color: "Tomato", cursor: "pointer" }}
    >
      <i className="fas fa-map-marker-alt"></i>
      <div className={classes.Card}>
        <h5>{name}</h5>
        <figure>
          <img src={icon} alt="icon" />
          <figcaption>{genre}</figcaption>
        </figure>
      </div>
    </div>
  );
};

export default Marker;
