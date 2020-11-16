const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
//goi model
const UserModel = require('../models/users_models');
const TokenModels = require('../models/token_models');

router.get('/user',(req,res)=>{
    link = req.originalUrl;
    main = 'users/main'; //method nay la master layout 
    UserModel.find()
    .sort({name: -1})
    .exec((err,data)=>{
            if(err)
            {
                res.send({kq: 0, err: err})
            }
            else
            {
                str='';
                data.forEach((v)=>{
                    if(v.status==false)
                    {
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
                    }
                    else {
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
                    }
                });
                //goi view
                res.render('index',{main: main, link: link, str: str});
            }
    });

});

router.get('/user/add',(req,res)=>{
    link = '/user'
    main = 'users/add'; //method nay la master layout 
    res.render('index',{main: main});
});

router.post('/list_delete',(req,res)=>{
    UserModel.find()
    .exec((err,data)=>{
            if(err)
            {
                console.log(err);
            }
            else
            {
                str='';
                data.forEach((v)=>{
                    if(v.status==true)
                    {
                        str += `<tr id="`+v._id+`">
                                    <td>`+v.name+`</td>
                                    <td>`+v.username+`</td>
                                    <td>
                                        <button class="btn btn-info" onclick="get_data_again('`+v._id+`')">Restore</button>
                                        <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#myModal`+v._id+`">Xóa</button>
                                    </td>
                                </tr>`
                    }
                });
                res.send(str);
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
        UserModel.find({name: {'$regex': data_search} })
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
    obj =  { 
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        email: req.body.email
     };
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
});

router.get('/view-login',(req,res)=>{

    res.render('users/login');

});

router.post('/login',(req,res)=>{
    UserModel.find({name: {'$regex': req.body.name} })
    .exec((err,data)=>{
            if(err)
            {
                res.send('ten khong ton tai');
            }
            else
            {
                console.log(data);
                UserModel.find({password: {'$regex': req.body.pass} })
                .exec((err,data)=>{
                    (err) ? res.send('sai mat khau'): res.send('ok')
                });  
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
    pattern_name = /^([a-z]|[A-Z]){1,}$/
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
        object = [
            {
                name: name,
                username: username,
                password: pass,
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
    }
    else
    {
        res.send(err);
        err=''
        check=0;
    }
});
module.exports = router;//xuat ra du lieu de su dung