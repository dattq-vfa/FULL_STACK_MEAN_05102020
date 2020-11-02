const express = require('express');
const router = express.Router();

router.get('/Main_category',(req,res)=>{
    main = 'category/Main_category'; //method nay la master layout 
    res.render('index',{main: main});
});

router.get('/Add_category',(req,res)=>{
    main = 'category/Add_category'; //method nay la master layout 
    res.render('index',{main: main});
});

router.get('/Edit_category',(req,res)=>{
    main = 'category/Edit_category'; //method nay la master layout 
    res.render('index',{main: main});
});

module.exports = router;//xuat ra du lieu de su dung