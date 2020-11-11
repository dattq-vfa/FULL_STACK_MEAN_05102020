const express = require('express');
const app = express();

const server = require('http').Server(app);///////dung de chat

const io = require('socket.io')(server);//server la bien o tren khai bao

//html
// $('#content_msg').animate({scrollTop:10000},800);//update scroll
//word-break: break-all; tu dong xuong dong

// gọi ra sử dụng
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const jwt = require('jsonwebtoken');
var fs = require('fs');
app.use('/', express.static('public'));
app.use('/server_client', express.static('public'));


const moment = require('moment');//su dung thoi gian
var mang_user=[];
let room = '';
var room_name=[]
//kiem tra ket noi
io.on('connection',function(socket){
    if(mang_user.indexOf(user) == -1)
    {
        const user_id = {
            socketID :  socket.id,
            username : user,
            room: room,
            time: moment().format('YYYY-MM-DD')
        }
        mang_user.push(user_id);
        socket.emit('id_user', socket.id);
    }
    io.sockets.emit('user_online',mang_user);
    //create and chat group
    
    socket.on('create_room',function(data){
        if(room_name.indexOf(data)==-1)
        {
            room_name.push(data);
        }
        io.sockets.emit('created_room',room_name);
    });
    io.sockets.emit('created_room',room_name);

    //ghep ten phong vs id
    socket.on('room_name',function(data){
        // const index = mang_user.findIndex(user_id => user_id.socketID == data.ID);
        // if(index!=-1)
        // {
        //     mang_user[index].room = data.room_name;
        // }
        socket.join(data.room_name);

    });

    //server nhan du lieu
    socket.on('send_message',function(data){
        const index = mang_user.findIndex(user_id => user_id.socketID == data.id);
        if(index!=-1)
        {
            data_add ={user: mang_user[index].username,content: data.content,id: data.id, time: moment().format('h:mm a')};
        }
        else
        {
            data_add ={content: data.content,id: data.id, time: moment().format('h:mm a')};
        }
        io.to(data.room).emit('receive_message', data_add);
    });

    //kiem tra thoat
    socket.on('disconnect',()=>{

        const index = mang_user.findIndex(user_id => user_id.socketID == socket.id);
        io.sockets.emit('receive_message',{user: mang_user[index].username,content: mang_user[index].username +' has left',id: mang_user[index].socketID, time: moment().format('h:mm a')});
        if(index != -1)
        {
            mang_user.splice(index,1)[0];
        }
        io.sockets.emit('user_online',mang_user);
    });
});


app.get('/',(req,res)=>{
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
        token = jwt.sign(payload,serectKey, {expiresIn: 600000}); //expiresIn: 60 thoi gian 60s
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

var token = '';
var check ='';
var user ='';
app.post('/client',(req,res)=>{
    token='';
    var tmp_data=[];
    if (fs.existsSync('./account.txt'))
    {
        let tmp = fs.readFileSync(__dirname + '/account.txt').toString().split("\n");
        for(i in tmp)
        {
            
            if(tmp[i]!='')
            {
                if(tmp_data.indexOf(tmp[i].split(' ')[0]+','+tmp[i].split(' ')[1]+','+tmp[i].split(' ')[3])== -1)
                {
                    tmp_data.push(tmp[i].split(' ')[0]+' '+tmp[i].split(' ')[1]+' '+tmp[i].split(' ')[3]);
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
    console.log('gui qua' + name +'  '+pass);
    if(tmp_data!=[])
    {
        for(i in tmp_data)
        {
            if(tmp_data[i].split(' ')[0]==name && tmp_data[i].split(' ')[1]==pass)
            {
                token = tmp_data[i].split(' ')[2];
                user = name;
                break;
            }
        } 
    }
    serectKey = '@#$%';
    jwt.verify(token,serectKey,(err,data)=>{//jwt.verify(token,serectKey,(err,data)=>{
        if(err)
        {
            res.send('err');
        }
        else
        {
            check= 'ok';
            res.send('ok');
        }
    });
});
app.get('/server_client',(req,res)=>{
    serectKey = '@#$%';
    jwt.verify(token,serectKey,(err,data)=>{//jwt.verify(token,serectKey,(err,data)=>{
        if(err)
        {
            token='';
            res.redirect('/');
        }
        else
        {
            res.sendFile(__dirname + '/client.html');
        }
    });
});


server.listen(3000,()=>{console.log('bat server')})