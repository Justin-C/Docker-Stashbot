const express = require('express');

const {
  addBin,
  addItem,
  removeItem,
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
router.post('/moveitem', moveItem);
module.exports = router;
