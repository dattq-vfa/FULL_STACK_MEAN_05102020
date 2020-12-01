const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
//goi model
const UserModel = require('../models/users_models');

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

module.exports = router;//xuat ra du lieu de su dung