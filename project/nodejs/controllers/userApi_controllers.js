const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
//goi model
const UserModel = require('../models/users_models');
//load bcrypt 
const bcrypt = require('bcrypt');
const TokenModel = require('../models/token_models');

//goi jwt
const jwt = require('jsonwebtoken');
//goi localstorage
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./cratch');
//lay danh sach tat ca thanh vien
router.get('/user/list',(req,res)=>{
    UserModel.find()
    .exec((err,data)=>{
        if(err){
            res.send({kq:0, err:err});
        }
        else
        {
            res.send({kq:1, data:data});
        }
    })
});
//lay ra thong tin 1 thanh vien
router.get('/user/list/:id',(req,res)=>{
    UserModel.find({_id: req.params.id})
    .exec((err,data)=>{
        if(err){
            res.send({kq:0, err:err});
        }
        else
        {
            res.send({kq:1, data:data});
        }
    })
});
//lay danh sach phan trang
router.get('/user/list/:skip/:limit',(req,res)=>{
    UserModel.find()
    .skip(parseInt(req.params.skip))
    .limit(parseInt(req.params.limit))
    .exec((err,data)=>{
        if(err){
            res.send({kq:0, err:err});
        }
        else
        {
            res.send({kq:1, data:data});
        }
    })
});


router.post('/user/login',(req,res)=>{
    console.log(req.body.username);
    UserModel.find({username:  req.body.username })
    .exec((err,data)=>{
            if(err)
            {
                res.send(err);
            }
            else
            {
                if(data.length<1)
                {
                    console.log(data)
                    res.send({username:'Tên không tồn tại!',password: 'sai mat khau'});
                }
                else
                {
                    console.log(data);
                    check_pass = bcrypt.compareSync(req.body.password, data[0].password);
                    if(check_pass)
                    {
                        console.log('ok')
                        payload = {
                                    name: data[0].name,
                                    username: data[0].username,
                                    password: data[0].password,
                                    email: data[0].email,
                                    phone: data[0].phone
                                }
                        serectKey = '@#$%';
                        token = jwt.sign(payload,serectKey, {expiresIn: 30}); //expiresIn: 120 la thoi gian 120s
                            obj = [
                                {
                                    id_user: data[0]._id,
                                    token: token
                                }
                            ]
                        TokenModel.create(obj,(err,data_token)=>{
                            if(err)
                            {
                                res.send('err create token');
                            }
                            else
                            {
                                localStorage.setItem('token',token);
                                localStorage.setItem('account',(data[0].name).toUpperCase());
                                res.send({kq:1, data: token});
                            }
                        });
                    } 
                    else
                    {
                        res.send({username:'oke',password: 'sai mat khau'});
                    }
                }           
            }
    });
});

module.exports = router;//xuat ra du lieu de su dung