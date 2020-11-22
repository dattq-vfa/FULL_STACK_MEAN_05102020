const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
//load bcrypt 
const bcrypt = require('bcrypt');
//goi model
const UserModel = require('../models/users_models');
const TokenModel = require('../models/token_models');

//goi jwt
const jwt = require('jsonwebtoken');
//goi localstorage
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./cratch');

//phân trang
router.get('/user(/:pageNumber)?', async (req,res)=>{
    // Lấy được token
    // => lấy được user
    // => 1. Kiểm tra đăng nhập
    // => 2. Kiểm tra quyền
    
    link = '/user';
    main = 'users/main'; //method nay la master layout
    // phan trang 

    // 1.limit 
    let limit = 2;

    // 2. tong so document 
    let totalDocument = await UserModel.find({status: false})
    // => tong so trang
    let totalPage = Math.ceil(totalDocument.length/limit);

    // 3. start 
    let pageNumber = req.params.pageNumber;
    console.log(typeof(pageNumber))
    if(typeof(pageNumber)=="string") pageNumber = parseInt(pageNumber);
    else if(pageNumber==undefined) pageNumber=1;
    if(pageNumber==undefined || pageNumber==1)
    {
        start =0 ;
        //xetActive=1;
    }
    else if(pageNumber>=2)
    {
        start = (pageNumber-1)*limit;
        //0 ,2 ,4 ,6
        //xetActive=page;
    }
    //xuat ra view
    
    // first
    view_totalPage=`<li class="page-item">
    <a class="page-link" href="user/1">First</a></li>`;
    // Prev
    if(pageNumber==1)
    {
        view_totalPage += `<li class="page-item">
        <a class="page-link" href="user/`+1+`">Prev</a></li>`;
    }
    else
    {
        view_totalPage += `<li class="page-item">
        <a class="page-link" href="user/`+(pageNumber-1)+`">Prev</a></li>`;
    }
    

    for(let i = 1; i <= totalPage; i++)
    {
        view_totalPage += `<li class="page-item">
        <a class="page-link" href="user/`+i+`">
        ` + i + `</a></li>`;
    }
    // Next
    if(totalPage>pageNumber)
    {
        view_totalPage += `<li class="page-item">
        <a class="page-link" href="user/`+(pageNumber+1)+`">Next</a></li>`;
    }
    else
    {
        view_totalPage += `<li class="page-item">
        <a class="page-link" href="user/`+totalPage+`">Next</a></li>`;
    }
   
    // Last
    view_totalPage += `<li class="page-item">
    <a class="page-link" href="user/`+totalPage+`">Last</a></li>`;
    
    UserModel.find({status: false})
    .skip(start)// giữ  trang
    .limit(limit)
    .sort({_id: -1})
    .exec((err,data)=>{
        if(err)
        {
            res.send({kq: 0, err: err})
        }
        else
        {
            str='';
                data.forEach((v)=>{

                    str += `<tr id="`+v._id+`">
                                <td>`+v.name+`</td>
                                <td>`+v.username+`</td>
                                <td>
                                    <a href="user/edit/`+v._id+`" class="btn btn-info">Sửa</a>
                                    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#myModal`+v._id+`">Xóa</button>
                                </td>
                            </tr>`
                    str += `<div class="modal" id="myModal`+v._id+`">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                
                                    <!-- Modal Header -->
                                    <div class="modal-header">
                                        <h4 class="modal-title">Thông báo</h4>
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    </div>
                                
                                    <!-- Modal body -->
                                    <div class="modal-body">
                                        Bạn có muốn xóa `+v.name+` không?
                                    </div>
                                
                                    <!-- Modal footer -->
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="delete_data('`+v._id+`')">Xóa ngay</button>
                                        <button type="button" class="btn btn-primary" data-dismiss="modal">Thoát</button>
                                    </div>
                                
                                    </div>
                                </div>
                            </div>`
                });
                // Gọi view
            res.render('index', {main: main, link:link, str:str, view_totalPage: view_totalPage});
        }
    });

});

router.get('/user/add/member',(req,res)=>{
    link = '/user'
    main = 'users/add'; //method nay la master layout 
    res.render('index',{main: main, link:link});
});

router.get('/user/member/list_delete',(req,res)=>{
    link = '/user';
    main = 'users/main'; //method nay la master layout
    UserModel.find({status: true})
    .exec((err,data)=>{
            if(err)
            {
                console.log(err);
            }
            else
            {
                str='';
                data.forEach((v)=>{
                    str += `<tr id="`+v._id+`">
                                <td>`+v.name+`</td>
                                <td>`+v.username+`</td>
                                <td>
                                    <button class="btn btn-info" onclick="get_data_again('`+v._id+`')">Restore</button>
                                    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#myModal`+v._id+`">Xóa</button>
                                </td>
                            </tr>`
                    str += `<div class="modal" id="myModal`+v._id+`">
                            <div class="modal-dialog">
                                <div class="modal-content">
                            
                                <!-- Modal Header -->
                                <div class="modal-header">
                                    <h4 class="modal-title">Thông báo</h4>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>
                            
                                <!-- Modal body -->
                                <div class="modal-body">
                                    Bạn có muốn xóa `+v.name+` không?
                                </div>
                            
                                <!-- Modal footer -->
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="delete_database('`+v._id+`')">Xóa ngay</button>
                                    <button type="button" class="btn btn-primary" data-dismiss="modal">Thoát</button>
                                </div>
                            
                                </div>
                            </div>
                        </div>`

                });
                res.render('index', {main: main, link:link, str:str,view_totalPage: ''});
            }
    });
});

router.post('/get_data_again',(req,res)=>{
    id = req.body.id;
    obj =  { status: false };
    UserModel.updateMany({ _id: id },obj,(err,data)=>{
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.log(data);
                res.send('get data again')
            }
    });
});

router.post('/search_data',(req,res)=>{
    data_search = req.body.text_search;
    if(data_search!='')
    {
        UserModel.find({name: {'$regex': data_search},status: false })
        .exec((err,data)=>{
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    res.send(data);
                }
        });
        
    }
});

router.post('/delete_database',(req,res)=>{
    id = req.body.id;
    UserModel.findByIdAndDelete({ _id: id},(err,data)=>{
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.log(data);
                res.send('da xoa')
            }
    });
});

router.post('/update_status',(req,res)=>{
    id = req.body.id;
    obj =  { status: true };
    UserModel.updateMany({ _id: id },obj,(err,data)=>{
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.log(data);
                res.send('da xoa')
            }
    });
});

router.get('/user/edit/:id',(req,res)=>{
        link = '/user'
        main = 'users/edit';
        UserModel.find({_id : req.params.id})
        .exec((err,data)=>{
            console.log(data[0]);
            res.render('index',{main: main, link: link, data: data[0]});

        });
});

router.post('/Change_ACCOUNT',(req,res)=>{
    if(req.body.password==''|req.body.password==null)
    {
        obj =  { 
            name: req.body.name,
            username: req.body.username,
            phone: req.body.phone,
            email: req.body.email
         };
         update_data();
    }
    else
    {
        const saltRounds= 10; //độ mã hóa
        //1. tạo chuỗi hash
        bcrypt.genSalt(saltRounds,(err, salt)=>{
            bcrypt.hash(req.body.password, salt,(err,hash)=>{
                obj =  { 
                    name: req.body.name,
                    username: req.body.username,
                    password: hash,
                    phone: req.body.phone,
                    email: req.body.email
                 };
                 update_data();
            });
        });
    }
    function update_data(){
        UserModel.updateMany({ _id: req.body.id },obj,(err,data)=>{
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.log(data);
                res.send('Updated')
            }
        });
    }
});

router.get('/view-login',(req,res)=>{

    res.render('users/login');

});

router.post('/login',(req,res)=>{
    UserModel.find({username: {'$regex': req.body.username} })
    .exec((err,data)=>{
            if(err)
            {
                res.send(err);
            }
            else
            {
                if(data.length<1)
                {
                    res.send('Tên không tồn tại!');
                }
                else
                {
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
                                res.send('ok');
                            }
                        });
                    } 
                    else
                    {
                        res.send('sai mat khau');
                    }
                }           
            }
    });
    
});

router.post('/ACCOUNT',(req,res)=>{
    let check=0;
    let err='';
    let name = req.body.name;
    let username = (req.body.username).replace(/\s+/g, ''); // \slà biểu thức chính cho "khoảng trắng" và glà cờ "toàn cầu", nghĩa là khớp với TẤT CẢ \s(khoảng trắng).
    let pass = req.body.pass;
    let phone = req.body.PHONE;
    let email = req.body.Email; 
    pattern_name = /\w/
    subject_name = name;
    pattern_username = /^([a-z]|[A-Z]){1,}$/
    subject_username = username;
    pattern_pass = /^(?=.*[!@#$%^&*.])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[0-9a-zA-Z!@#$%^&*.]{8,}$/ //?=.*[a-z] giống if sau đó thực hiện [0-9a-zA-Z!@#$%^&*.]{8,}
    subject_pass = pass;
    pattern_phone = /^0(3[2-9]|56|58|59|70|7[6-9]|8[1-6]|8[8-9]|)[0-9]{7}$/ //3[2-9] thay cho 32-39
    subject_phone = phone;
    pattern_email = /^([a-z,A-Z,0-9]){3,}\@gmail.(com|co)$/
    subject_email = email;
    (pattern_name.test(subject_name)) ? check=check+1: err+='Please enter name again!'+'\n';
    (pattern_username.test(subject_username)) ? check=check+1: err+='Please enter username again!'+'\n';
    (pattern_pass.test(subject_pass)) ? check=check+1: err+='Please enter pass again!'+'\n';
    (pattern_phone.test(subject_phone)) ? check=check+1: err+='Please enter phone again!'+'\n';
    (pattern_email.test(subject_email)) ? check=check+1: err+='Please enter email again!';
    if(check==5)
    {
        //1. tạo chuỗi hash
        console.log(pass);
        const saltRounds= 10; //độ mã hóa
        //1. tạo chuỗi hash
        bcrypt.genSalt(saltRounds,(err, salt)=>{
            bcrypt.hash(pass, salt,(err,hash)=>{
                object = [
                    {
                        name: name,
                        username: username,
                        password: hash,
                        email: email,
                        phone: phone
                    }
                ]
                UserModel.create(object,(err,data)=>{
                    if(err)
                    {
                        console.log(err);
                        res.send('err');
                    }
                    else
                    {
                        console.log(data);
                        res.send('ok')
                    }
                });
            });
        });

    }
    else
    {
        res.send(err);
        err=''
        check=0;
    }
});
module.exports = router;//xuat ra du lieu de su dung