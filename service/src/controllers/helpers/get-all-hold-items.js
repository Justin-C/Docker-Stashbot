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
    // use parametrized queries instead of string concat (security/sql inj)
    const queryText = `SELECT item_name
    FROM on_hold
    ORDER BY date_added DESC;`;
    const result = await client.query(queryText);
    console.log('get all items result', result);
    const itemsOnHold = result.rows.map(row => row.item_name);
    client.end();
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
