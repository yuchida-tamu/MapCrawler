import React, { useState } from "react";
import Form from "../../components/Form/Form";
import Map from "../../components/Map/Map";
import List from "../../components/List/List";
import axios from "axios";
import { Context } from "../../context/context";
import MyList from "../MyList/MyList";
import Backdrop from "../../components/Backdrop/Backdrop";

const PlaceFinder = () => {
  const [places, setPlaces] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [placeList, setPlaceList] = useState([]);
  const [showMyList, setShowMyList] = useState(false);

  const downloadContent =
    "data:application/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(placeList));
  const href = "data:" + downloadContent;

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

  const toggleMyListHandler = () => {
    const toggle = showMyList;
    setShowMyList(!toggle);
  };

  const closeModalHandler = () => {
    setShowMyList(false);
  };

  const addItemToListHandler = (place) => {
    const updatedList = [place, ...placeList];
    const filteredList = [...new Set(updatedList)];
    setPlaceList(filteredList);

    console.log("list", placeList);
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
    <div>
      <div className="row">
        <div className="btn" onClick={toggleMyListHandler}>
          {showMyList ? "HIDE" : "My List"}
        </div>
      </div>
      <Context.Provider
        value={{
          addToList: addItemToListHandler,
          placeList,
          href,
        }}
      >
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
        {showMyList ? <Backdrop /> : null}
        {showMyList ? <MyList close={closeModalHandler} /> : null}
      </Context.Provider>
    </div>
  );
};

export default PlaceFinder;
