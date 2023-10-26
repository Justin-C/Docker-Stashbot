const express = require('express');

const {
  addBin,
  addItem,
  removeItem,
  findItems,
} = require('../controllers/stashbot');

const router = express.Router();

router.post('/addbin', addBin);
router.post('/additem', addItem);
router.post('/removeitem', removeItem);
router.post('/finditems', findItems);
module.exports = router;
