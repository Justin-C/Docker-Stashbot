const { request, response } = require("express");
const addBin = require("./helpers/add-bin");
const addToItems = require("./helpers/add-to-items");
const validateItemName = require("./helpers/validators/validate-item-name");
const validateLocation = require("./helpers/validators/validate-location");
const removeFromItems = require("./helpers/remove-from-items");

const STASHBOT_RESPONSE = require("./helpers/STASHBOT_RESPONSE");

exports.addBin = async (request, response) => {
  const { didError, speechResponse } = await addBin.addBin();

  if (didError) {
    response.status(400).send(speechResponse);
  } else {
    response.status(200).send(speechResponse);
  }
};

exports.addItem = async (request, response) => {
  console.log("/addItem request", request?.body);
  // input validation
  const itemName = validateItemName.validateItemName(
    request?.body?.itemName ?? ""
  );
  const location = validateLocation.validateLocation(
    request?.body?.location ?? ""
  );
  // TODO: validation for quantity, itemTagsArray
  // NOTE: quantity is currently not parsed or expected

  if (!itemName || !location) {
    response
      .status(400)
      .send(STASHBOT_RESPONSE.STASHBOT_RESPONSE.REQUEST_ERROR());
    return;
  }
  try {
    const resp = await addToItems.addToItems({
      itemName,
      location,
    });
    response.status(200).send(resp);
  } catch (err) {
    console.log(err);
    response.status(400).send(err.message);
  }
};

/*
 */
exports.removeItem = async (request, response) => {
  // TODO: sanitize input

  // input validation
  const itemName = validateItemName.validateItemName(
    request?.body?.itemName ?? ""
  );
  if (!itemName) {
    response
      .status(400)
      .send(STASHBOT_RESPONSE.STASHBOT_RESPONSE.REQUEST_ERROR());
    return;
  }

  try {
    const resp = await removeFromItems.removeFromItems(itemName);
    response.status(200).send(resp);
  } catch (err) {
    response.status(400).send(err.message);
  }
};
