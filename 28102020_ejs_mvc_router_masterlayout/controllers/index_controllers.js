const express = require('express');
const router = express.Router();

const admin_controllers = require('./admin_controllers.js')
router.use('/',admin_controllers);

const product_controllers = require("./product_controllers.js")
router.use('/',product_controllers);

module.exports=router;