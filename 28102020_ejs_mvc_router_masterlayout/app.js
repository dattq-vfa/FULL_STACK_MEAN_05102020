

const { forEach } = require('async');
const express = require('express');
const app = express();

//ejs
//1. là 1 view engine
//2. view engine la
//  2.1 công dụng viết code html đơn giản và có thể dử dụng lại
//  2.2 đưa dữ liệu vào từ phía server và render ra đoạn HTML cuối cùng

//3. cách sử dụng dữ liệu từ server gửi qua
//  1.xuất ra 1 giá trị: <%=name%>
//  2.xuất ra 1 giá trị chứa có code html: <%-name%>
//  3.viết các câu lệnh: <% câu lệnh %>
//  4.gọi đến 1 file: <%- include(name); %>

//goi ejs ra su dung
app.set('view engine','ejs');

const index_controllers = require('./controllers/index_controllers.js')

app.use('/',index_controllers);



app.listen(3000,()=>{console.log('on server');});