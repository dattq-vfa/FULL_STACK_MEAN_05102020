const express = require('express');
const router = express.Router();

router.get('/Add_member',(req,res)=>{
    main = 'members/Add_member'; //method nay la master layout 
    res.render('index',{main: main});
});

router.get('/Edit_member',(req,res)=>{
    main = 'members/Edit_member'; //method nay la master layout 
    res.render('index',{main: main});
});

router.get('/Main_member',(req,res)=>{
    main = 'members/Main_member'; //method nay la master layout 
    res.render('index',{main: main});
});

const path1 = require('path');
// Allow assets directory listings
const serveIndex = require('serve-index'); 
router.use('/uploads',express.static('uploads'),serveIndex(path1.join(__dirname, '/uploads/uploads')));
router.use('/image',express.static('public'),serveIndex(path1.join(__dirname, '/public/image')));
//////////////////////////////

router.post('/register',(req,res)=>{
    let name = req.body.name;
    let pass = req.body.pass;
    let content = req.body.content;
    res.send(`<b>Name: ${name}</b>` + `<br><b>Password: ${pass}<b><br>` + content);
})
//save path img
var path = '';
//load multer
const multer = require('multer');
//cau hinh luu file
const storage = multer.diskStorage({
    //duong dan luu file
    destination: (req,file,cb)=>{
        cb(null,'uploads/uploads');
    },
    //kiem tra file
    filename: (req,file,cb)=>{
        
        //3 truong hop upload anh
        //--1 : anh khong duoc trung ten :su dung Date.now()
        //--2 : kiem tra đuôi ảnh (.jpg or png)
        //--3 : dung lượng của tấm ảnh 

        if(file.mimetype != 'image/jpeg'&&file.mimetype != 'image/png')
        {
            return cb('File khong dung dinh dang');
        }
        else
        {
            cb(null, Date.now() + '-' + file.originalname);
            path += file.originalname +' ';//them cho nay de lay ten file, hoac req.files de lay chi tiet tat ca file
        }
    }
});
var limits = {fileSize: 1024*50}; // hieu la 200kb
// Gọi ra sử dụng
const uploads = multer ({storage: storage, limits: limits}).array('img');//array neu iput nhieu file, con 1 file thi single
router.post('/upload_file',(req,res)=>{
    uploads(req, res, function(err){
        if(path=='') 
        {
            path='No choosed Image';
        }
        if(err instanceof multer.MulterError)
        {
           res.send("File quá lớn"); 
        }
        else if(err) 
        {
            res.send(err);
        }
        else
        {
            res.send(path);
        } 
        path='';
    });
});
router.post('/view-login',(req,res)=>{
    let name = req.body.name;
    let pass = req.body.pass;
    res.send(`<b>Name: ${name}</b>` + `<br><b>Password: ${pass}<b><br>`);
});

module.exports = router;//xuat ra du lieu de su dung