const express = require('express');
const app = express();

const server = require('http').Server(app);///////dung de chat

const io = require('socket.io')(server);//server la bien o tren khai bao

// gọi ra sử dụng
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const jwt = require('jsonwebtoken');
var fs = require('fs');

//kiem tra ket noi
io.on('connection',function(socket){
    console.log('Online:'+ socket.id);

    //server nhan du lieu
    socket.on('client-onlypeople',function(data){
        //4.1 gui du lieu di
        //socket.emit('server-onlypeople', data);

        //4.3 : gửi qua cho nhiều người khác, trừ client gửi
        //socket.broadcast.emit('server-onlypeople', data);

        //  4.4: gửi cho tất cả
        io.sockets.emit('server-onlypeople',data);
    });

    //kiem tra thoat
    socket.on('disconnect',()=>{
        console.log(socket.id + ' da thoat')
    });
});


app.get('/login',(req,res)=>{
    res.sendFile(__dirname + '/login.html');
});

app.get('/create_account',(req,res)=>{
    res.sendFile(__dirname + '/create_account.html');
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
        payload = {
            name: name,
            pass: pass,
            email: email
        }
        serectKey = '@#$%';
        token = jwt.sign(payload,serectKey, {expiresIn: 60}); //expiresIn: 60 thoi gian 60s
        //res.end(token);
        //res.send(token);
        fs.appendFile('account.txt',name +' '+pass+' '+email+' '+token+'\n',function(err){ //them noi dung moi vao file
            if(err)throw err;
                console.log('saved');
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

app.post('/client',(req,res)=>{
    var tmp_data=[''];
    let token = '';
    if (fs.existsSync('./account.txt'))
    {
        let tmp = fs.readFileSync(__dirname + '/account.txt').toString().split("\n");
        for(i in tmp)
        {
            
            if(tmp[i]!='')
            {
                if(tmp_data.indexOf(tmp[i].split(' ')[0]+','+tmp[i].split(' ')[1]+','+tmp[i].split(' ')[3])== -1)
                {
                    tmp_data.push(tmp[i].split(' ')[0]+','+tmp[i].split(' ')[1]+','+tmp[i].split(' ')[3]);
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
    if(tmp_data!=[''])
    {
        for(i in tmp_data)
        {
            if(tmp_data[i].split(',')[0]==name && tmp_data[i].split(',')[1]==pass)
            {
                token = tmp_data[i].split(',')[3];
                break;
            }
        } 
    }
    serectKey = '@#$%';
    jwt.verify(token,serectKey,(err,data)=>{//jwt.verify(token,serectKey,(err,data)=>{
        if(err)
        {
            res.redirect('/login');
        }
        else
        {
            token='';
            res.sendFile(__dirname + '/client.html');
        }
    });
});

server.listen(3000,()=>{console.log('bat server')})