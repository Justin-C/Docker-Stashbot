const db = require('./connect-to-db');
const STASHBOT_RESPONSE = require('./STASHBOT_RESPONSE');

/*
 * TODO
 */
async function removeHold(itemName) {
  let queryResp;

  const client = db.connectToDb();
  client.connect();
  try {
    const queryText = 'DELETE FROM on_hold WHERE item_name = $1 RETURNING *';
    const queryValues = [itemName];
    // using parametrized query values protects against sql injection attacks
    queryResp = await client.query(queryText, queryValues);
  } catch (error) {
    client.end();
    throw new Error(STASHBOT_RESPONSE.STASHBOT_RESPONSE.REMOVE_ERROR(itemName));
  }
  client.end();
  const removedCount = queryResp?.rowCount ?? 0;
  if (removedCount === 0) {
    throw new Error(
      STASHBOT_RESPONSE.STASHBOT_RESPONSE.REMOVE_NOT_FOUND(itemName),
    );
  } else if (removedCount === 1) {
    const location = queryResp.rows[0].location;
    return STASHBOT_RESPONSE.STASHBOT_RESPONSE.REMOVE_SUCCESS(
      itemName,
      location,
    );
  } else {
    throw new Error(STASHBOT_RESPONSE.STASHBOT_RESPONSE.REMOVE_ERROR(itemName));
  }
}

module.exports.removeHold = removeHold;
