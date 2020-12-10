const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
//goi model
const productModel = require('../models/product_models');

router.get('/product/list',(req,res)=>{
    productModel.find()
    .exec((err,data)=>{
        if(err)
        {
            res.send({kq:1, err:err});
        }
        else
        {
            res.send({kq:1, data:data})
        }
    })
});

function ChangeToSlug(title)
{
    var  slug;
    //Đổi chữ hoa thành chữ thường
    slug = title.toLowerCase();
 
    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, " - ");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    //In slug ra textbox có id “slug”
    return slug;
}

//thao tac voi file
var fs = require('fs');
var request = require('request');
//them du lieu
router.post('/product/add',(req,res)=>{
    //download img from internet
    var download = function(uri, filename, callback){
        request.head(uri, function(err, res, body){
        //   console.log('content-type:', res.headers['content-type']);
        //   console.log('content-length:', res.headers['content-length']);
          request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
    };
    //phân tích lấy đuôi ảnh
    img = req.body.image;
    tail ='';
    if(img!='')
    {
        arrTail = img.split('.');
        tail = Date.now() + '.' + arrTail[3];
    }
    download(img,'./public/product/'+ tail ,function(){});

    obj =
            {
                name: req.body.name,
                link: ChangeToSlug(req.body.name),
                description: req.body.description,
                content: req.body.content,
                image: tail,
                images: req.body.images,
                price: req.body.price,
                id_category: req.body.id_category,
            }
            //token
            //id_user
            productModel.create(obj,(err,data)=>{
                if(err) res.send({kq:0, err:err})
                else
                {
                    res.send({kq:1, data:data});
                }
            })
});

router.post('/product/add/list',(req,res)=>{
    res.send({kq:1 ,data:req.body.name});
});

module.exports = router;//xuat ra du lieu de su dung