/*
 * MongoDB Schema
 */
const mongoose = require("mongoose");
const placeSchema = new mongoose.Schema({
  formatted_address: { type: String },
  location: {
    lat: { type: String, required: true },
    lng: { type: String, required: true },
  },
  name: String,
  place_id: { type: String, required: true },
  icon: String,
  types: [String],
});

const placeListSchema = new mongoose.Schema({
  ownerID: { type: String },
  name: String,
  list: [placeSchema],
});

/*
 * MongoDB Model
 */
mongoose.model("Place", placeSchema);
mongoose.model("PlaceList", placeListSchema);
