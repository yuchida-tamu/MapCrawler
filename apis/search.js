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
router.route("/text").get((req, res) => {
  const { keywords, lat, lng } = req.query;
  console.log(req);
  const params =
    lat && lng && lat !== undefined && lng !== undefined
      ? {
          key: process.env.GOOGLE_MAPS_API_KEY,
          query: keywords,
          location: { lat, lng },
        }
      : {
          key: process.env.GOOGLE_MAPS_API_KEY,
          query: keywords,
        };

  console.log("params", params);
  client
    .textSearch({
      params: params,
      timeout: 1000, // milliseconds
    })
    .then((result) => {
      const data = result.data.results.map((place) => ({
        formatted_address: place.formatted_address,
        location: place.geometry.location,
        name: place.name,
        place_id: place.place_id,
        types: place.types,
        icon: place.icon,
      }));
      res.status(200).json({ status: "SUCCESS", data: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ status: "FAIL", error: err });
    });
});

module.exports = router;
