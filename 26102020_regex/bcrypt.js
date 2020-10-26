//1. tạo chuỗi hash
//2. so khớp

//load bcrypt 
const bcrypt = require('bcrypt');

const saltRounds= 10; //độ mã hóa
const password = '123456';// mật khẩu người dùng

//1. tạo chuỗi hash

// bcrypt.genSalt(saltRounds,(err, salt)=>{
//     bcrypt.hash(password, salt,(err,hash)=>{
//         console.log(hash);
//     });
// });

//$2b$10$EuJsKz7YgRlhFIYIxiops..w.7Eb3hU26T0TXLxBgDYx.h20XUG3a

//2. so khớp

const hash ='$2b$10$EuJsKz7YgRlhFIYIxiops..w.7Eb3hU26T0TXLxBgDYx.h20XUG3a'

bcrypt.compare(password,hash,(err,result)=>{
    console.log(result);
});


