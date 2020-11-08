const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/',express.static('public'));
app.set('view engine', 'ejs');
const jwt = require('jsonwebtoken');

const index_controllers = require('./controllers/index_controllers.js');
app.use('/',index_controllers);


app.listen(3000,()=>{console.log('on server')})