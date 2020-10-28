
//multer :  sử dụng để tải lên các tệp
//upload file
//CKEDITOR:  là một trình soạn thảo văn bản HTML
//BS4 modal
//cookie
// ứng dụng
//  1. kiểm tra đăng nhập
//  2. quản lý phiên làm việc của người dùng
//goi thu vien cookie

// //1. tạo cookie
// app.get('/createCookie',(req,res)=>{ //ten , gia tri, thoi gian
//     res.cookie('name','nguyen van A',{maxAge: 1000*120}).end('da tao cookie');
// });

// //2. sử dụng cookie 
// app.get('/useCookie',(req,res)=>{
//     res.end(req.cookies.name); //su dung req.cookies.name
// })
// //3. Hủy cookie
// app.get('/deletecookie',(req,res)=>{
//     res.clearCookie('name').end('cookie deleted');
// });

//tải npm 
//npm install cookie-parser
//html: c1: tạo button kết hợp thẻ <a herf="/logout"></a> và thuộc tính app.get
//c2: sủ dụng type:get  window.location.href = '/login'; //chuyen trang và app.get thêm res.send() 
//so sánh password: var a = bcrypt.compareSync(password,hash) a sẽ trả về true nếu đúng và ngược lại

const express = require('express');
const app = express();

//đọc file
var fs = require('fs');
const bcrypt = require('bcrypt');//ma hoa password
// gọi ra sử dụng
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
//khai bao cookie
const cookie = require('cookie-parser');
//goi ra su dung
app.use(cookie());
app.get('/', (req, res)=>{
    if(req.cookies.name != undefined)//su dung cookie 
    {
        res.sendFile( __dirname + '/index.html' );
    }
    else
    {
        res.redirect('/login')
    }
    
});
// cấu hình đường dẫn tĩnh
app.use('/', express.static('public'));

app.post('/register',(req,res)=>{
    let name = req.body.name;
    let pass = req.body.pass;
    let content = req.body.content;
    res.send(`<b>Name: ${name}</b>` + `<br><b>Password: ${pass}<b><br>` + content);
})
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

// c1:clear cookie 
app.get('/logout', (req, res)=>{
    res.clearCookie('name');
    res.redirect('/login');
});

// c2:clear cookie app.get('/logout', (req, res)=>{
//     res.clearCookie('name');
//     res.send();
// });

app.post('/view-login',(req,res)=>{
    var kq=0;
    var tmp_data=[''];
    var check =0;
    if (fs.existsSync('./account.txt'))
    {
        let tmp = fs.readFileSync(__dirname + '/account.txt').toString().split("\n");
        for(i in tmp)
        {
            
            if(tmp[i]!='')
            {
                if(tmp_data.indexOf(tmp[i].split(' ')[0]+','+tmp[i].split(' ')[1])== -1)
                {
                    tmp_data.push(tmp[i].split(' ')[0]+','+tmp[i].split(' ')[1]);
                }
            }
        }               
    }
    else
    {
        fs.appendFile('account.txt','',function(err){
            if(err)throw err;
            console.log('saved');
        });
    }
    let name = req.body.name;
    let pass = req.body.pass;
    const password = pass;
    if(tmp_data!=[''])
    {
        for(i in tmp_data)
        {
            if(tmp_data[i].split(',')[0]==name)
            {
                const hash = tmp_data[i].split(',')[1];
                var a = bcrypt.compareSync(password,hash)
                if(a==true){
                    check=1;
                }
            }
        } 
    }
    if(check==1)
    {
        kq= 1;
        //tao cookie
        res.cookie('name','nguyen van B',{maxAge: 1000*20});
    }
    else
    {
        kq= 0;
    }
    res.send({kq:kq});
    // res.send(`<b>Name: ${name}</b>` + `<br><b>Password: ${pass}<b><br>`);
    
});
//them create
app.get('/create-account',(req,res)=>{
    res.sendFile(__dirname + '/account.html');
});

app.post('/ACCOUNT',(req,res)=>{
    let check=0;
    let err='';
    let name = req.body.name;
    let pass = req.body.pass;
    let phone = req.body.PHONE;
    let email = req.body.Email; 
    pattern_name = /^([a-z]|[A-Z]){1,}$/
    subject_name = name;
    pattern_pass = /^(?=.*[!@#$%^&*.])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[0-9a-zA-Z!@#$%^&*.]{8,}$/ //?=.*[a-z] giống if sau đó thực hiện [0-9a-zA-Z!@#$%^&*.]{8,}
    subject_pass = pass;
    pattern_phone = /^0(3[2-9]|56|58|59|70|7[6-9]|8[1-6]|8[8-9]|)[0-9]{7}$/ //3[2-9] thay cho 32-39
    subject_phone = phone;
    pattern_email = /^([a-z,A-Z,0-9]){3,}\@gmail.(com|co)$/
    subject_email = email;
    (pattern_name.test(subject_name)) ? check=check+1: err+='Please enter name again!'+'\n';
    (pattern_pass.test(subject_pass)) ? check=check+1: err+='Please enter pass again!'+'\n';
    (pattern_phone.test(subject_phone)) ? check=check+1: err+='Please enter phone again!'+'\n';
    (pattern_email.test(subject_email)) ? check=check+1: err+='Please enter email again!';
    if(check==4)
    {
        const saltRounds= 10; //độ mã hóa
        const password = pass;
        bcrypt.genSalt(saltRounds,(err, salt)=>{
            bcrypt.hash(password, salt,(err,hash)=>{
                fs.appendFile('account.txt',name +' '+hash+' '+phone+' '+email+'\n',function(err){ //them noi dung moi vao file
                    if(err)throw err;
                        console.log('saved');
                    }); 
                });
        });
        res.send('ok');
        check=0;
        console.log(pass)
    }
    else
    {
        console.log(pass)
        res.send(err);
        err=''
        check=0;
    }

});

app.listen(3000, ()=>{ console.log('Server enabled') });