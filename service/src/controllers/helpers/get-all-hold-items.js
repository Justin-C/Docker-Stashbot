const db = require('./connect-to-db');
const STASHBOT_RESPONSE = require('./STASHBOT_RESPONSE');

/*
adds item in items table to holds table to indicate hold status 
@param
itemName: itemname string, expect only alpha and spaces.  
location is number(? or int str) of bin
quantity: TODO, defaults to 1
@return: bool of if there was an error, string that alexa should speak

*/
async function getAllHoldItems() {
  const client = db.connectToDb();
  client.connect();
  try {
    const queryText = `
    SELECT oh.item_name, i.location
    FROM on_hold oh
    JOIN items i ON oh.item_name = i.item_name
    ORDER BY oh.date_added DESC;
  `;
  
  const result = await client.query(queryText);
  console.log('get all items result', result);
  
  // Map rows to objects with itemName and location
  const itemsOnHold = result.rows.map(row => ({
    itemName: row.item_name,
    location: row.location
  }));
  
  client.end(); // Assuming you are closing the client connection here
  
  return itemsOnHold;
  } catch (error) {
    console.log('get all hold items error', error);

    // check if error is bc the item exists already
    // TODO: error message for if bin does not exist
    if (error && error.detail) {
      throw new Error(STASHBOT_RESPONSE.STASHBOT_RESPONSE.HOLD_ERROR());
      //   if (error.detail.includes('already exists')) {
      //     throw new Error(
      //       STASHBOT_RESPONSE.STASHBOT_RESPONSE.ADD_ERROR_EXISTING(itemName),
      //     );
      //   } else if (error.detail.includes('not present in table')) {
      //     throw new Error(
      //       STASHBOT_RESPONSE.STASHBOT_RESPONSE.ADD_ERROR_BIN(location),
      //     );
      //   } else {
      //     throw new Error(
      //       STASHBOT_RESPONSE.STASHBOT_RESPONSE.ADD_ERROR(itemName),
      //     );
      //   }
    } else {
      throw new Error(STASHBOT_RESPONSE.STASHBOT_RESPONSE.HOLD_ERROR());
    }
  }
}

module.exports.getAllHoldItems = getAllHoldItems;
