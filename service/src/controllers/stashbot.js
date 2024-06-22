const { request, response } = require('express');
const addBin = require('./helpers/add-bin');
const addToItems = require('./helpers/add-to-items');
const validateItemName = require('./helpers/validators/validate-item-name');
const validateLocation = require('./helpers/validators/validate-location');
const removeFromItems = require('./helpers/remove-from-items');
const holdItem = require('./helpers/hold-item');
const getAllHoldItems = require('./helpers/get-all-hold-items');
const STASHBOT_RESPONSE = require('./helpers/STASHBOT_RESPONSE');
const findItems = require('./helpers/find-items');

const errorResponse = error => {
  if (typeof error === 'string') {
    return { error: error };
  }
  return { error: error.message };
};
const successResponse = response => {
  if (typeof response === 'string') {
    return { response: response };
  }
  return response;
};
exports.addBin = async (request, response) => {
  const { didError, speechResponse } = await addBin.addBin();

  if (didError) {
    response.status(400).send(successResponse(speechResponse));
  } else {
    response.status(200).send(errorResponse(speechResponse));
  }
};

exports.addItem = async (request, response) => {
  console.log('/addItem request', request?.body);
  // input validation
  const itemName = validateItemName.validateItemName(
    request?.body?.itemName ?? '',
  );
  const location = validateLocation.validateLocation(
    request?.body?.location ?? '',
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
    response.status(200).send(successResponse(resp));
  } catch (err) {
    console.log(err);
    response.status(400).send(errorResponse(err.message));
  }
};

/*
 */
exports.removeItem = async (request, response) => {
  // TODO: sanitize input

  // input validation
  const itemName = validateItemName.validateItemName(
    request?.body?.itemName ?? '',
  );
  if (!itemName) {
    response
      .status(400)
      .send(STASHBOT_RESPONSE.STASHBOT_RESPONSE.REQUEST_ERROR());
    return;
  }

  try {
    const resp = await removeFromItems.removeFromItems(itemName);
    response.status(200).send(successResponse(resp));
  } catch (err) {
    response.status(400).send(errorResponse(err.message));
  }
};

exports.findItems = async (request, response) => {
  // TODO: sanitize input
  // input validation
  const itemName = validateItemName.validateItemName(
    request?.body?.itemName ?? '',
  );
  if (!itemName) {
    response
      .status(400)
      .send(errorResponse(STASHBOT_RESPONSE.STASHBOT_RESPONSE.REQUEST_ERROR()));
    return;
  }

  try {
    const resp = await findItems.findItems(itemName);
    response.status(200).send(successResponse(resp));
  } catch (err) {
    response.status(400).send(errorResponse(err.message));
  }
};

exports.holdItem = async (request, response) => {
  // TODO
  const itemName = validateItemName.validateItemName(
    request?.body?.itemName ?? '',
  );
  if (!itemName) {
    response
      .status(400)
      .send(STASHBOT_RESPONSE.STASHBOT_RESPONSE.REQUEST_ERROR());
    return;
  }

  try {
    const resp = await holdItem.holdItem(itemName);
    response.status(200).send(resp);
  } catch (err) {
    response.status(400).send(err.message);
  }
};

exports.getAllHoldItems = async (request, response) => {
  try {
    const resp = await getAllHoldItems.getAllHoldItems();
    response.status(200).send(resp);
  } catch (err) {
    response.status(400).send(err.message);
  }
};

exports.moveItem = async (request, response) => {
  // TODO
  const itemName = validateItemName.validateItemName(
    request?.body?.itemName ?? '',
  );
  if (!itemName) {
    response
      .status(400)
      .send(STASHBOT_RESPONSE.STASHBOT_RESPONSE.REQUEST_ERROR());
    return;
  }

  try {
    const resp = await holdItem.holdItem(itemName);
    response.status(200).send(resp);
  } catch (err) {
    response.status(400).send(err.message);
  }
};
