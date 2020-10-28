
const express = require('express');
const router = express.Router();



router.get('/',(req,res)=>{

    main = 'partials/main_home';
    // bang = '<span style="color:red">hello</span>';
    // obj = {
    //     name: 'nguyen van k',
    //     age: 18
    // };
    // mang = [
    //     {
    //         name: 'nguyen a'
    //     },
    //     {
    //         name: 'nguyen b'
    //     },
    //     {
    //         name: 'nguyen c'
    //     }
    // ]
    
    res.render('index',{main: main});//{main: main, bang:bang}

});
module.exports=router;