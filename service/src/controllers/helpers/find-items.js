const db = require('./connect-to-db');
const STASHBOT_RESPONSE = require('./STASHBOT_RESPONSE');

/*
does find query to db
@param
itemName: itemname string, expect only alpha and spaces.  
@return: array of finds as response strings

*/
async function findItems(itemName) {
  // success response
  let queryResp;
  const client = db.connectToDb();
  client.connect();
  try {
    queryResp = await client.query(
      'SELECT * FROM items WHERE item_name LIKE $1',
      [`%${itemName}%`],
    );
  } catch (error) {
    client.end();
    throw new Error(STASHBOT_RESPONSE.STASHBOT_RESPONSE.FIND_ERROR());
  }
  client.end();
  const foundRows = queryResp?.rows ?? [];
  let responseArray = [];
  if (foundRows.length > 0) {
    for (const entry of foundRows) {
      responseArray.push({
        itemName: entry.item_name,
        location: entry.location,
      });
    }
  } else {
    throw new Error(STASHBOT_RESPONSE.STASHBOT_RESPONSE.FIND_NONE(itemName));
  }
  return { foundItems: responseArray };
}

module.exports.findItems = findItems;
