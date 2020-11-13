const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
//goi model
const UserModel = require('../models/users_models')

router.get('/user',(req,res)=>{
    link = req.originalUrl;
    main = 'users/main'; //method nay la master layout 
    UserModel.find()
    .exec((err,data)=>{
            if(err)
            {
                res.send({kq: 0, err: err})
            }
            else
            {
                str='';
                data.forEach((v)=>{
                    str += `<tr>
                    <td>`+v.name+`</td>
                    <td>`+v.username+`</td>
                    <td>
                        <a href="product/edit/1" class="btn btn-info">Sửa</a>
                        <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#myModal">Xóa</button>
                    </td>
                  </tr>`
                });
                //goi view
                res.render('index',{main: main, link: link, str: str});
            }
    });

});

router.get('/user/add',(req,res)=>{
    main = 'users/add'; //method nay la master layout 
    res.render('index',{main: main});
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

router.post('/ACCOUNT',(req,res)=>{
    let check=0;
    let err='';
    let name = req.body.name;
    let username = (req.body.username).replace(/\s+/g, ''); // \slà biểu thức chính cho "khoảng trắng" và glà cờ "toàn cầu", nghĩa là khớp với TẤT CẢ \s(khoảng trắng).
    let pass = req.body.pass;
    let phone = req.body.PHONE;
    let email = req.body.Email; 
    console.log(username)
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