/*
@param itemName: expected item name string
rules:
is string
longer than 1 char after trimming
@return string: empty string or item name with only whitespaces and alpha chars
*/
function validateItemName(itemName) {
  let validatedItemName = '';
  if (itemName && typeof itemName === 'string') {
    // trim whitespace
    trimmedItemName = itemName
      .replace(/\s\s+/g, ' ')
      .trim()
      .toLowerCase();
    if (trimmedItemName.length > 1) {
      validatedItemName = trimmedItemName;
    }
  }
  return validatedItemName;
}

module.exports.validateItemName = validateItemName;
