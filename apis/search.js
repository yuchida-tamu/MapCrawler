const express = require("express");
const router = express.Router();
const client = require("../client");
const { PlaceInputType } = require("@googlemaps/google-maps-services-js");

/*
 * SEARCH Service API
 * Search places with keyword strings
 * Returns a list of GoogleMap location objects
 */
router.route("/").get((req, res) => {
  res.send("Search places...");
});
/*
 * Search places by text
 */
router.route("/:keywords").get((req, res) => {
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
      res.status(200).json({ status: "SUCCESS", data: data });
    })
    .catch((err) => {
      res.status(200).json({ status: "FAIL", error: err });
    });
});

module.exports = router;
