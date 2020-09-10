const express = require('express');
const mimovrsteController = require('../../../controllers/apis/mimovrste');

const router = express.Router();

router.post('/mimovrste/add', mimovrsteController.add);

module.exports = router;
