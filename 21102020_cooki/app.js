
//multer :  sử dụng để tải lên các tệp
//upload file
//CKEDITOR:  là một trình soạn thảo văn bản HTML
//BS4 modal

const express = require('express');
const app = express();

// gọi ra sử dụng
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res)=>{
    res.sendFile( __dirname + '/index.html' );
});

// cấu hình đường dẫn tĩnh
app.use('/', express.static('public'));

app.post('/register',(req,res)=>{
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
        cb(null,'uploads');
    },
    //kiem tra file
    filename: (req,file,cb)=>{
        // path = file.originalname;
        // cb(null, Date.now() + '-' + file.originalname);
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
        }
    }
});
var limits = {fileSize: 1024*50}; // hieu la 200kb
// Gọi ra sử dụng
const uploads = multer ({storage: storage, limits: limits}).single('img');
app.post('/upload_file',(req,res)=>{
    uploads(req, res, function(err){
        // if(path=='') 
        // {
        //     path='No choosed Image';
        // }
        if(err instanceof multer.MulterError)
        {
           return res.send(err);
        }
        else if(err) 
        {
            return res.send(err);
        }
        else
        {
            return res.send(req.file.originalname);
            // path='';
        }
    });
});
app.get('/login',(req,res)=>{
    res.sendFile(__dirname + '/login.html')
});
app.post('/view-login',(req,res)=>{
    let name = req.body.name;
    let pass = req.body.pass;
    res.send(`<b>Name: ${name}</b>` + `<br><b>Password: ${pass}<b><br>`);
});

app.listen(3000, ()=>{ console.log('Server enabled') });