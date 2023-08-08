const express = require('express');

const { addBin, addItem, removeItem } = require('../controllers/stashbot');

const router = express.Router();

router.post('/addbin', addBin);
router.post('/additem', addItem);
router.post('/removeitem', removeItem);
module.exports = router;