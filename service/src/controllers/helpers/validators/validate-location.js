
/*
@param location: expected positive integer as string
@return string: location string or empty string on invalid
*/
function validateLocation(location) {
    var n = Math.floor(Number(location));
    const isValid = n !== Infinity && String(n) === location && n >= 0;
    return isValid ? location : '';
}

module.exports.validateLocation = validateLocation;