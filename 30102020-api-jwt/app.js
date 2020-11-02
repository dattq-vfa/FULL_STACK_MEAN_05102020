const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// ý nghĩa của việc viết API
//  1.Bên ngoài có thể sử dụng được
//  2.Những người biết sử dụng API
//  3.Có thể đăng tin tự động bên web khác

//Để bảo mật API thì sử dụng jsonwebtoken (jwt)
//npm install jsonwebtoken

//Gọi jsonwebtoken ra sử dụng

const jwt = require('jsonwebtoken');

//1.tạo token
app.get('/createToken',(req,res)=>{
    payload = {
        name: 'nguyen van A',
        username: 'nguyenvanA',
        email: 'kientrumhodo997@gmail.com'
    }
    serectKey = '@#$%';
    token = jwt.sign(payload,serectKey, {expiresIn: 60}); //expiresIn: 60 thoi gian 60s
    res.end(token);
});

app.get('/',(req,res)=>{
    res.send('hello')
});

//2.Sử dụng token
app.post('/register',(req,res)=>{
    //token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmd1eWVuIHZhbiBBIiwidXNlcm5hbWUiOiJuZ3V5ZW52YW5BIiwiZW1haWwiOiJraWVudHJ1bWhvZG85OTdAZ21haWwuY29tIiwiaWF0IjoxNjA0MTEzNDI5LCJleHAiOjE2MDQxMTM0ODl9.OvPhO90l04e49N2xzcQ9Kl6qPCmF5PWn-EM9VHbjcX0';
    serectKey = '@#$%';
    jwt.verify(req.body.token,serectKey,(err,data)=>{//jwt.verify(token,serectKey,(err,data)=>{
        if(err)
        {
            res.send({err: err});
        }
        else
        {
            kq = parseFloat(req.body.soa)+ parseFloat(req.body.sob);
            res.send('ket qua:'+ kq); //res.send phai la kieu string
        }
    });
    
})

app.listen(3000,()=>{console.log('on server')});