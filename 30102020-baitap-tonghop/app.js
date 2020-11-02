//npm install ejs
//model la xu ly rieng database
//controllers la noi xu li chinh nhung cai app
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


const express = require('express');
const app = express();
// gọi ra sử dụng
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
// cấu hình đường dẫn tĩnh
app.use('/',express.static('public'));
//goi ejs ra su dung
app.set('view engine', 'ejs'); // mặc định trỏ vào folder views (nhớ tạo folder views), truong hop nay su dung ejs con rat nhieu view engine nua

//goi den file su dung
const index_controllers = require('./controllers/index_controllers.js');
app.use('/',index_controllers);

app.listen(3000,()=>{console.log('on server');});