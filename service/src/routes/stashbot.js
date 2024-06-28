const express = require('express');

const {
  addBin,
  addItem,
  removeItem,
  removeHold,
  findItems,
  holdItem,
  moveItem,
  getAllHoldItems,
} = require('../controllers/stashbot');

const router = express.Router();

router.post('/addbin', addBin);
router.post('/additem', addItem);
router.post('/removeitem', removeItem);
router.post('/finditems', findItems);
router.post('/holditem', holdItem);
router.get('/getholds', getAllHoldItems);
router.post('/removehold', removeHold);
router.post('/moveitem', moveItem);
module.exports = router;
