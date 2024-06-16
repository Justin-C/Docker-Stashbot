const STASHBOT_RESPONSE = {
  REQUEST_ERROR() {
    return `unknown error with the request`;
  },

  ADD_ERROR(itemName) {
    return `unknown error trying to add item ${itemName}`;
  },
  ADD_SUCCESS(itemName, location) {
    return `${itemName} added to bin ${location}`;
  },
  ADD_ERROR_EXISTING(itemName) {
    return `${itemName} already exists in the stash`;
  },
  ADD_ERROR_BIN(location) {
    return `bin ${location} does not exist`;
  },

  FIND_SUCCESS(itemName, location) {
    return `${itemName} is in bin ${location}`;
  },
  FIND_ERROR() {
    return `there was an error finding the item`;
  },
  FIND_NONE(itemName) {
    return `${itemName} was not found in the stash`;
  },

  REMOVE_SUCCESS(itemName, location) {
    return `${itemName} removed from bin ${location}`;
  },
  REMOVE_ERROR(itemName) {
    return `Error removing ${itemName} from stash`;
  },
  REMOVE_NOT_FOUND(itemName) {
    return `Could not find item ${itemName} to remove`;
  },

  ADD_BIN_SUCCESS(location) {
    return `bin ${location} added`;
  },
  ADD_BIN_ERROR() {
    return `error adding new bin`;
  },
  HOLD_ERROR() {
    return `error holding item`
  },
  HOLD_SUCCESS() {
    return `item put on hold successfully`
  },

  MOVE_ERROR() {
    return `error holding item`
  },
  MOVE_SUCCESS(itemName, location) {
    return `${itemName} moved to bin ${location} successfully`
  }

};

module.exports.STASHBOT_RESPONSE = STASHBOT_RESPONSE;
