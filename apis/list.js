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
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fs = require("fs");

const Place = mongoose.model("Place");
const PlaceList = mongoose.model("PlaceList");

router.route("/new").post(async (req, res) => {
  /* input validation */
  const { isValid, msg } = validateInputs(req, true);
  if (!isValid) return res.status(400).json({ status: "FAIL", msg: msg });

  const { body } = req;
  const list = body.map(
    (place) =>
      new Place({
        formatted_address: place.formatted_address,
        location: place.location,
        name: place.name,
        place_id: place.place_id,
        types: place.types,
        icon: place.icon,
      })
  );
  try {
    const placeList = await new PlaceList({
      ownerID: "Dummy",
      list: list,
    }).save();

    res.status(200).json({
      status: "SUCCESS",
      list: placeList,
      msg: "Successfully created a new list",
    });
  } catch (err) {
    res.status(500).json({
      status: "FAIL",
      msg: "Failed to create a new list",
      list: [],
      error: err,
    });
  }
});
/* Update the existing list */

router
  .route("/:id")
  .put(async (req, res) => {
    /* input validation */
    const { isValid, msg } = validateInputs(req, false);
    if (!isValid) return res.status(400).json({ status: "FAIL", msg: msg });

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
      return res.status(200).json({
        status: "SUCCESS",
        list: updated,
        msg: "Successsfully updated the list",
      });
    } catch (err) {
      return res.status(500).json({
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
      return res.status(200).json({
        status: "SUCCESS",
        removed: removed,
        msg: `Successfully removed: ${id}`,
      });
    } catch (err) {
      return res.status(500).json({
        status: "FAIL",
        removed: [],
        msg: `Failed to remove: ${id}`,
        error: err,
      });
    }
  });

const validateInputs = (req, isNew) => {
  const { id } = req.params;
  const { body } = req;
  let result = { isValid: true, msg: "Successfully validated" };

  /* Validate the param, :id, is valid ObjectId for MongoDB */
  if (!isNew && !mongoose.Types.ObjectId.isValid(id))
    result = { isValid: false, msg: "Invalid Id" };

  body.forEach((place) => {
    /* Validate necessary inputs are included */
    if (!place.place_id) {
      result = {
        isValid: false,
        msg: "Invalid inputs. place_id is missing",
      };
      return;
    }

    //location
    if (!("location" in place)) {
      result = {
        isValid: false,
        msg: "Invalid inputs. location is missing",
      };
      return;
    }
    /* Validate location.lat & location.lng are valid values (Number) */
    if (
      place.location.hasOwnProperty("lat") &&
      place.location.hasOwnProperty("lng")
    ) {
      const { lat, lng } = place.location;
      if (isNaN(lat)) {
        result = {
          isValid: false,
          msg: "Invalid inputs. lat has to be a number",
        };
        return;
      }
      if (isNaN(lng)) {
        result = {
          isValid: false,
          msg: "Invalid inputs. lng has to be a number",
        };
        return;
      }
    } else {
      result = {
        isValid: false,
        msg: "Invalid inputs. location.lat or location.lng is missing",
      };
      return;
    }
  });

  return result;
};

/*
 * Exporting JSON file Service API
 */
router.route("/:id/export").get(async (req, res) => {
  const { id } = req.params;
  /* fetch the list */
  const placeListObj = await PlaceList.findById(id);
  const listJSON = JSON.stringify(placeListObj.list);
  fs.writeFile(`./store/${id}.json`, listJSON, (err) => {
    if (err) {
      res
        .status(500)
        .json({ status: "FAIL", msg: "Failed to export a json file" });
    } else {
      res
        .status(200)
        .json({ status: "SUCCESS", msg: "Exported a file successfully" });
    }
  });
});

module.exports = router;
