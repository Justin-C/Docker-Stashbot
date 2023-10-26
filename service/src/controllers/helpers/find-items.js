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
      `SELECT * FROM items WHERE item_name LIKE '%${itemName}%'`,
    );
  } catch (error) {
    console.log('jrc find item error', error);
    client.end();
    return new Error({
      speechResponse: [STASHBOT_RESPONSE.STASHBOT_RESPONSE.FIND_ERROR()],
    });
  }
  client.end();
  const foundRows = queryResp?.rows ?? [];
  let responseArray = [];
  if (foundRows.length > 0) {
    for (const entry of foundRows) {
      console.log('jrc entry', entry);
      responseArray.push({
        itemName: entry.item_name,
        itemLocation: entry.location,
      });
    }
  } else {
    return new Error(STASHBOT_RESPONSE.STASHBOT_RESPONSE.FIND_NONE(itemName));
  }
  return { foundItems: responseArray };
}

module.exports.findItems = findItems;
