const express = require('express');
const mimovrsteController = require('../../../controllers/apis/mimovrste');

const router = express.Router();

router.post('/mimovrste/save', mimovrsteController.save);

module.exports = router;
