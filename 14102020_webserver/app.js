//npm init : khoi tao folder quan li thu vien
//npm install express : cai framework express
//npm install -g nodemon : tu dong chay sever khi luu(-g la global)
//goi chay 1 lan nodemon ten file (ex: nodemon app)
//

const express = require('express');
const app = express();

//phuong thuc: get, post, delete, patch,............

//routing
// app.get('/',(req,res)=>{

//     res.send('Complete!');

// });
//
//lay id trong duong dan
// app.get('/:so1/:so2',(req,res)=>{
//     res.send(req.params.so1 + req.params.so2 );
// });
//
//pt bac 1
var kq="";
var a=0, b=0 ,c=0;
app.get('/ptb1/:a/:b',(req,res)=>{
    a = Number(req.params.a);
    b = Number(req.params.b);
    if(a==0)
    {
        (b==0) ? kq='ptvsn': kq='ptvn';
    }
    else 
    {
        kq='nghiem cua pt la: ' + (-b)/a;
    }
    res.send(kq);
});
//
//pt bac 2
app.get('/ptb2/:a/:b/:c',(req,res)=>{
    a = Number(req.params.a);
    b = Number(req.params.b);
    c = Number(req.params.c);
    var x1="",x2="";
        var denta = b*b -4*a*c;
        if(a==0) {
            if(b==0)
                {
                  (c==0) ? kq='ptvsn': kq='ptvn';
                }
             else 
                 {
                     kq='nghiem cua pt la: ' + (-c)/b;
                }
        }
        else
        {
            if(denta==0) 
            {
                kq = 'nghiem cua pt la: ' + (-b)/(2*a);
            }
            else if(denta<0) 
            {
                kq = 'pt vo nghiem';
            }
            else
            {
                x1 = (-b + Math.sqrt(denta))/(2*a);
                x2 = (-b - Math.sqrt(denta))/(2*a);
                kq= 'nghiem cua pt la: x1 = ' + x1 + ' ,x2 = ' + x2;
            }
        }
    res.send(kq);
});
//
//
app.get('/form',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});
//

app.listen(3000,()=>{ console.log("da bat server")});