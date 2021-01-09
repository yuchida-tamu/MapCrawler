require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

/*testing commandline input DeleteLate*/

/**************** */

/*
Google Map Client
*/
const {
  Client,
  PlaceInputType,
} = require("@googlemaps/google-maps-services-js");
const client = new Client({});

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});
/*
SEARCH Service API
Search places with keyword strings
Returns a list of GoogleMap location objects
*/
app.route("/api/v1/search").get((req, res) => {
  res.send("Search places...");
});
/*Search places by text */
app.route("/api/v1/search/:keywords").get((req, res) => {
  const { keywords } = req.params;
  client
    .findPlaceFromText({
      params: {
        key: process.env.GOOGLE_MAPS_API_KEY,
        input: keywords,
        inputtype: PlaceInputType.textQuery,
        fields: [
          "geometry",
          "formatted_address",
          "name",
          "opening_hours",
          "place_id",
        ],
      },
      timeout: 1000, // milliseconds
    })
    .then((result) => {
      const data = result.data.candidates.map((place) => ({
        formatted_address: place.formatted_address,
        location: place.geometry.location,
        name: place.name,
        place_id: place.place_id,
      }));
      res.send({ status: "SUCCESS", data: data });
    })
    .catch((err) => {
      res.send({ status: "FAIL", error: err });
    });
});

app.listen(3000, () => {
  console.log("Server is running...");
});
