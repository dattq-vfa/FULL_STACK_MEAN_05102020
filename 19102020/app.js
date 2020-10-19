
//multer
//upload file
//CKEDITOR
//BS4 modal

const express = require('express');
const app = express();
//goi ra su dung
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.use('/',express.static('public'));


app.get('/ptb1',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.post('/giaiptb1',(req,res)=>{
    var noidung = req.body.noidung;
    res.send(noidung);// return ket qua qua ben html la result
});
//load multer 
const multer = require('multer');
const storage = multer.diskStorage({

    //duong dan luu file
    destination: (req,file,cb)=>{
        cb(null,'uploads');
    },
    //kiem tra file
    filename:(req, file, cb)=>{}
});

const uploads = multer({storage:storage}).single('img');
app.post('/upload-file',(req,res)=>{
    uploads(req,res,err=>{
        (err) ? res.send(err): res.send('OK');
    })
})

app.listen(3000,()=>{
    console.log('da connect');
});

//pt bac 1
var kq="";
function ptb1(a,b){
    if(a==0)
    {
        (b==0) ? kq='ptvsn': kq='ptvn';
    }
    else 
    {
        kq='nghiem cua pt la: ' + (-b)/a;
    }
    return kq;
}
