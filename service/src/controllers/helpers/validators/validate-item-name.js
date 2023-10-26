/*
@param itemName: expected item name string
rules:
is string
longer than 1 char after trimming and removing non whitespaces and alpha chars
@return string: empty string or item name with only whitespaces and alpha chars
*/
function validateItemName(itemName) {
  let validatedItemName = '';
  if (itemName && typeof itemName === 'string') {
    // trim whitespace and remove all non space/alpha chars
    trimmedItemName = itemName
      .replace(/[^a-zA-Z ]/g, '')
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
