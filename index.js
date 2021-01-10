require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

/*
 * MongoDB
 */
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.on("open", () => {
  console.log("DB connected!!!");
});

/*
 * MongoDB Schema
 */

const placeSchema = new mongoose.Schema({
  formatted_address: { type: String },
  location: {
    lat: { type: String, required: true },
    lng: { type: String, required: true },
  },
  name: String,
  place_id: { type: String, required: true },
});

const placeListSchema = new mongoose.Schema({
  ownerID: { type: String },
  list: [placeSchema],
});

/*
 * MongoDB Model
 */
const Place = mongoose.model("Place", placeSchema);
const PlaceList = mongoose.model("PlaceList", placeListSchema);
/*
 * Google Map Client
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
 * SEARCH Service API
 * Search places with keyword strings
 * Returns a list of GoogleMap location objects
 */
app.route("/api/v1/search").get((req, res) => {
  res.send("Search places...");
});
/*
 * Search places by text
 */
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

/*
 * Save place list Service API
 * Save a list of place objects to DB
 * Body returns an array of place objects, which has to be conformed to the proper format to be processed
 * {
 *  formatted_address,
 *  location {required},
 *  name,
 *  place_id {required},
 * }
 */
app.route("/api/v1/list/new").post(async (req, res) => {
  const { body } = req;
  const list = body.map(
    (place) =>
      new Place({
        formatted_address: place.formatted_address,
        location: place.location,
        name: place.name,
        place_id: place.place_id,
      })
  );
  try {
    const placeList = await new PlaceList({
      ownerID: "Dummy",
      list: list,
    }).save();

    res.send({
      status: "SUCCESS",
      list: placeList,
      msg: "Successfully created a new list",
    });
  } catch (err) {
    res.send({
      status: "FAIL",
      msg: "Failed to create a new list",
      list: [],
      error: err,
    });
  }
});
/* Update the existing list */
app
  .route("/api/v1/list/:id")
  .put(async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const updatedList = body.map(
      (place) =>
        new Place({
          formatted_address: place.formatted_address,
          location: place.location,
          name: place.name,
          place_id: place.place_id,
        })
    );

    const options = {
      new: true,
    };
    try {
      const updated = await PlaceList.findByIdAndUpdate(
        id,
        { list: updatedList },
        options
      ).exec();
      res.send({
        status: "SUCCESS",
        list: updated,
        msg: "Successsfully updated the list",
      });
    } catch (err) {
      res.send({
        status: "FAIL",
        list: [],
        msg: "Failed to update the list",
        error: err,
      });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      const removed = await PlaceList.findByIdAndRemove(id).exec();
      res.send({
        status: "SUCCESS",
        removed: removed,
        msg: `Successfully removed: ${id}`,
      });
    } catch (err) {
      res.send({
        status: "FAIL",
        removed: [],
        msg: `Failed to remove: ${id}`,
        error: err,
      });
    }
  });

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});
