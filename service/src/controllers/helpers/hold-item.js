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
async function holdItem( itemName ) {
  console.log(itemName);
  const client = db.connectToDb();
  client.connect();
  try {
    // use parametrized queries instead of string concat (security/sql inj)
    const queryText = `INSERT INTO on_hold(item_name) VALUES($1) RETURNING *`;
    const queryValues = [itemName];
    await client.query(queryText, queryValues);
  } catch (error) {
    console.log('error', error);

    // check if error is bc the item exists already
    // TODO: error message for if bin does not exist
    if (error && error.detail) {
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
  client.end();
  return STASHBOT_RESPONSE.STASHBOT_RESPONSE.HOLD_SUCCESS();
}

module.exports.holdItem = holdItem;
