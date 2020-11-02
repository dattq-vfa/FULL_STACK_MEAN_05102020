const express = require('express');
const router = express.Router();

router.get('/product',(req,res)=>{
    main = 'products/main'; //method nay la master layout 
    res.render('index',{main: main});
});

module.exports = router;//xuat ra du lieu de su dung