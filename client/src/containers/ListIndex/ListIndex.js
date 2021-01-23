import React, { useState, useEffect } from "react";
import axios from "axios";

const ListIndex = () => {
  const [lists, setLists] = useState([]);

  /*
   * load lists from db on loading
   */
  useEffect(() => {
    axios
      .get("/api/v1/list")
      .then((result) => {
        setLists(result.data.lists);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const renderLists = () => {
    return lists.map((list) => {
      return (
        <li
          key={list._id}
          className="card"
          style={{ cursor: "pointer", textAlign: "center" }}
        >
          <h5 className="card-title">{list.name}</h5>
        </li>
      );
    });
  };

  return (
    <div className="container">
      <ul>{renderLists()}</ul>
    </div>
  );
};

export default ListIndex;
