import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

const DEFAULT_CENTER = {
  lat: 59.95,
  lng: 30.33,
};

const Marker = ({ text }) => <div>{text}</div>;

const Map = ({ places }) => {
  const [center, setCenter] = useState(
    places && places.length > 0 ? places[0].location : DEFAULT_CENTER
  );
  /**
   * Update the center of the Map, everytime the place info is updated.
   * */
  useEffect(() => {
    setCenter(places[0].location);
  }, places);

  const [zoom, setZoom] = useState(15);

  //TODO: Create Marker Component
  const markers = places.map((place) => (
    <Marker lat={place.location.lat} lng={place.location.lng} text="MARKER" />
  ));

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_MAP_KEY}` }}
        defaultCenter={DEFAULT_CENTER}
        defaultZoom={zoom}
        center={center}
      >
        {markers}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
