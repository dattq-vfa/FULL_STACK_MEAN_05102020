const express = require('express');
const router = express.Router();

router.get('/Add_product',(req,res)=>{
    main = 'products/Add_product'; //method nay la master layout 
    res.render('index',{main: main});
});

router.get('/Edit_product',(req,res)=>{
    main = 'products/Edit_product'; //method nay la master layout 
    res.render('index',{main: main});
});

router.get('/Main_product',(req,res)=>{
    main = 'products/Main_product'; //method nay la master layout 
    res.render('index',{main: main});
});

module.exports = router;//xuat ra du lieu de su dung