const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const { response } = require('express');
require('dotenv').config();

const app = express();
const port = process.env.port || 8080;

// Apply middlewares
app.use(morgan('dev')); //  - this will output logging for routes fetched
app.use(bodyParser.json()); // - process request body into JSON on the fly
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(cors()); // allows all origins
// if ((process.env.NODE_ENV = 'development')) {
//   app.use(cors());
// } else {
//   app.use(cors());
// }

// Set up routes
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

var stashbotRouter = require('./routes/stashbot');
app.use('/stashbot', stashbotRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
