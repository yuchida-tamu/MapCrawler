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

  const onSubmitToSaveHandler = (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    if (!name || name === "") return;
    const data = { name, list: placeList };
    axios
      .post("/api/v1/list/new", data)
      .then((result) => {
        console.log(result.data.status);
      })
      .catch((err) => {
        console.log(err);
      });
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
        if (status === "SUCCESS") {
          const formattedData = data.map((place) => ({
            ...place,
            isAdded: false,
          }));
          setPlaces(formattedData);
        }
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
    const modifiedPlace = { ...place, isAdded: true };
    let updatedList = [];
    if (placeList.length === 0) {
      updatedList = [modifiedPlace];
    } else {
      const tempArr = placeList.filter((p) => p.place_id !== place.place_id);
      updatedList = [modifiedPlace, ...tempArr];
    }

    const updatedPlaces = updatePlaceInArray(places, modifiedPlace);

    setPlaces(updatedPlaces);
    setPlaceList(updatedList);
  };

  const removeItemHandler = (place) => {
    const filteredList = placeList.filter((p) => p.place_id !== place.place_id);
    const updatedPlaces = updatePlaceInArray(places, {
      ...place,
      isAdded: false,
    });
    setPlaceList(filteredList);
    setPlaces(updatedPlaces);
  };

  const updatePlaceInArray = (arr, update) => {
    return arr.map((p) => {
      if (p.place_id === update.place_id) {
        return update;
      }
      return p;
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
    <div>
      <div className="row">
        <div className="btn" onClick={toggleMyListHandler}>
          {showMyList ? "HIDE" : "My List"}
          <span
            className="badge white-text"
            style={{
              display: "inline-block",
              padding: "5px 0 0 0",
              width: "10%",
            }}
          >
            {placeList.length}
          </span>
        </div>
      </div>
      <Context.Provider
        value={{
          addToList: addItemToListHandler,
          removeFromList: removeItemHandler,
          saveList: onSubmitToSaveHandler,
          placeList,
          href,
        }}
      >
        <div
          className="row"
          style={{ padding: "0", margin: "0", height: "10vh" }}
        >
          <Form
            click={onSubmitHandler}
            name={"search"}
            placeholder={"search by keywords..."}
          />
        </div>
        <div
          className="row"
          style={{ padding: "0", margin: "0", height: "90vh" }}
        >
          <List places={places} placeList={placeList} isMyList={false} />
          <Map places={places} onMapChange={onMapChangeHander} />
        </div>
        {showMyList ? <Backdrop close={closeModalHandler} /> : null}
        {showMyList ? <MyList close={closeModalHandler} /> : null}
      </Context.Provider>
    </div>
  );
};

export default PlaceFinder;
