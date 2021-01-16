import React, { useState } from "react";
import Form from "../../components/Form/Form";
import Map from "../../components/Map/Map";
import List from "../../components/List/List";
import axios from "axios";
import { defaultAxiosInstance } from "@googlemaps/google-maps-services-js";

const PlaceFinder = () => {
  const [places, setPlaces] = useState([]);
  const [keywords, setKeywords] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setKeywords(event.target[0].value);
    fetchPlaces(keywords);
  };

  const fetchPlaces = () => {
    axios
      .get(`/api/v1/search/text`, {
        params: {
          keywords,
          lat: undefined,
          lng: undefined,
        },
      })
      .then((result) => {
        const { status, data } = result.data;
        if (status === "SUCCESS") setPlaces(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onMapChangeHander = (obj) => {
    const { lat, lng } = obj.center;

    axios
      .get(`/api/v1/search/text`, {
        params: {
          keywords,
          lat: lat(),
          lng: lng(),
        },
      })
      .then((result) => {
        const { status, data } = result.data;
        if (status === "SUCCESS") setPlaces(data);
      })
      .catch((err) => {
        console.error(err);
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
        <Map places={places} onMapChange={onMapChangeHander} />
      </div>
    </div>
  );
};

export default PlaceFinder;
