
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
        cb(null, Date.now() + '-' + file.originalname);
        path = file.originalname;
    }
});
// Gọi ra sử dụng
const uploads = multer ({storage: storage}).single('img');
app.post('/upload_file',(req,res)=>{
    uploads(req, res, err=> {
        if(path=='') 
        {
            path='No choosed Image';
        }
        if(err) 
        {
            res.send(err);
        }
        else
        {
            res.send(path);
            path='';
        }
    });
});

app.listen(3000, ()=>{ console.log('Server enabled') });