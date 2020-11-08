const express = require('express');
const router = express.Router();

router.get('/product',(req,res)=>{
    link = req.originalUrl;
    main = 'products/main'; //method nay la master layout 
    res.render('index',{main: main, link: link});
});

router.get('/product/add',(req,res)=>{
    main = 'products/add'; //method nay la master layout 
    res.render('index',{main: main});
});

module.exports = router;//xuat ra du lieu de su dung