require("dotenv").config();
const cors = require("cors");
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
//Place and PlaceList model
require("./data/place");

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
 *CORS (enable all cors request)
 */
app.use(cors());

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
const searchApi = require("./apis/search");
app.use("/api/v1/search", searchApi);

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
const listApi = require("./apis/list");
app.use("/api/v1/list", listApi);

app.listen(process.env.PORT || 3030, () => {
  console.log(
    "Server is running...",
    process.env.PORT ? process.env.PORT : 3030
  );
});
