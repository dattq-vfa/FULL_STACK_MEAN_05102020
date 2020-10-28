const express = require('express');
const router = express.Router();

router.get('/product',(req,res)=>{
    main = 'products/main';
    res.render('index',{main: main});
});
module.exports=router;