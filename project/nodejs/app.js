const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/',express.static('public'));
app.set('view engine', 'ejs');
const jwt = require('jsonwebtoken');

//mở api
// app.use((req,res, next)=>{
//     res.setHeader('Access-Control-Allow-Origin','http://localhost:4200');
//     res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,PATCH,DELETE');
//     res.setHeader('Access-Control-Allow-Headers','X-Requested-Width,content-type');
//     res.setHeader('Access-Control-Allow-Credentials',true);
//     next();
// });
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//goi database
require('./database');

const index_controllers = require('./controllers/index_controllers.js');
app.use('/',index_controllers);


app.listen(3000,()=>{console.log('on server')})

//mo hinh MVC

//M: xu li rieng ben mongodb
//C: xu li chinh
//v: noi hien thi giao dien cho nguoi dung

//=> 