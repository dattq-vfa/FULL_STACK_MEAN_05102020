const express = require('express');
const router = express.Router();

//goi den file admin
const admin_controllers = require('./admin_controllers');
router.use('/',admin_controllers);

//goi den file product
const product_controllers = require('./product_controllers');
router.use('/',product_controllers);

const user_controllers = require('./user_controllers');
router.use('/',user_controllers);

const userApi_controllers = require('./userApi_controllers');
router.use('/api/',userApi_controllers);

const productApi_controllers = require('./productApi_controllers');
router.use('/',productApi_controllers);

module.exports = router; //xuat ra du lieu de su dung