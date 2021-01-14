import React, { useState } from "react";
import Form from "../../components/Form/Form";
import Map from "../../components/Map/Map";
import List from "../../components/List/List";
import axios from "axios";

const PlaceFinder = () => {
  const [places, setPlaces] = useState([]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    fetchPlaces(event.target[0].value);
  };

  const fetchPlaces = (keywords) => {
    axios
      .get(`/api/v1/search/${keywords}`)
      .then((result) => {
        const { status, data } = result.data;
        if (status === "SUCCESS") setPlaces(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div
        className="row"
        style={{ padding: "0", margin: "0", height: "10vh" }}
      >
        <Form click={onSubmitHandler} />
      </div>
      <div
        className="row"
        style={{ padding: "0", margin: "0", height: "90vh" }}
      >
        <List places={places} />
        <Map places={places} />
      </div>
    </div>
  );
};

export default PlaceFinder;
