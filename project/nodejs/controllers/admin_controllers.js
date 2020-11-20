const express = require('express');
const router = express.Router();

//goi jwt
const jwt = require('jsonwebtoken');
//goi localstorage
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./cratch');

router.get('/',(req,res)=>{
    serectKey = '@#$%';
    jwt.verify(localStorage.getItem('token'),serectKey,(err,data)=>{//jwt.verify(token,serectKey,(err,data)=>{
        if(err)
        {
            res.redirect('/view-login');
        }
        else
        {
            link = req.originalUrl;
            main = 'partials/main_home';
            res.render('index',{main:main , link: link});//gui du lieu khi su dung ejs
        }
    });
});

module.exports = router; //xuat ra du lieu de su dung