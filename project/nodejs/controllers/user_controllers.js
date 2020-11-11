const express = require('express');
const router = express.Router();

//goi model
const UserModel = require('../models/users_models')

router.get('/user',(req,res)=>{
    link = req.originalUrl;
    main = 'users/main'; //method nay la master layout 
    UserModel.find()
    .exec((err,data)=>{
            if(err)
            {
                res.send({kq: 0, err: err})
            }
            else
            {
                str='';
                data.forEach((v)=>{
                    str += `<tr>
                    <td>`+v.name+`</td>
                    <td>`+v.username+`</td>
                    <td>
                        <a href="product/edit/1" class="btn btn-info">Sửa</a>
                        <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#myModal">Xóa</button>
                    </td>
                  </tr>`
                });
                //goi view
                res.render('index',{main: main, link: link, str: str});
            }
    });

});

router.get('user/add',(req,res)=>{
    main = 'users/add'; //method nay la master layout 
    res.render('index',{main: main});
});

module.exports = router;//xuat ra du lieu de su dung