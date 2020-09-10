const express = require('express');
const mimovrsteController = require('../controllers/mimovrste');

const router = express.Router();

router.get('/', mimovrsteController.index);

module.exports = router;
