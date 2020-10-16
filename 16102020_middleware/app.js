const express = require('express');
const app = express();
//goi ra su dung
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.get('/ptb1',(req,res)=>{
    res.sendFile(__dirname + '/ptb1.html');
});

app.post('/giaiptb1',(req,res)=>{
    var soa = req.body.soa;
    var sob = req.body.sob;
    ptb1(soa,sob);
    res.send(kq);// return ket qua qua ben html la result
});

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
