const db = require('./connect-to-db');
const STASHBOT_RESPONSE = require('./STASHBOT_RESPONSE');

async function addBin() {
  console.log('jrc add bin');
  const client = db.connectToDb();
  client.connect();
  let resp;
  let speechResponse;
  let didError = false;
  try {
    resp = await client.query(`insert into bins default values returning *`);
  } catch (err) {
    didError = true;
    speechResponse = STASHBOT_RESPONSE.STASHBOT_RESPONSE.ADD_BIN_ERROR();
  }
  client.end();
  // get number id (location) of the newly added bin row
  const location =
    resp && resp.rows && resp.rows[0] && resp.rows[0].id
      ? resp.rows[0].id
      : '0';

  speechResponse =
    STASHBOT_RESPONSE.STASHBOT_RESPONSE.ADD_BIN_SUCCESS(location);
  console.log('jrc add bin', resp, speechResponse, didError);
  return { speechResponse, didError };
}

module.exports.addBin = addBin;
