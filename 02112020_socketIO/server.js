const express = require('express');
const app = express();

const server = require('http').Server(app);///////dung de chat

//npm install socket.io
//lý thuyết socket io
//1. emit : gửi đi
//2. on : nhận

//3. client khi gửi đi chỉ gửi cho server
//4. server gửi đi :

//  4.1: gửi cho chính họ 
//socket.emit('name', data);

//  4.2: gửi qua cho một người khác và chính họ
//id nguoi nhan
//du lieu
//io.to(id).emit('name',data);

//  4.3: gửi qua cho nhiều người khác, trừ client gửi
//socket.broadcast.emit('name', data);

//  4.4: gửi cho tất cả
//io.sockets.emit('name',data);

// goi socket io ra su dung
const io = require('socket.io')(server);//server la bien o tren khai bao

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



app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/client.html');
});

server.listen(3000,()=>{console.log('bat server')})