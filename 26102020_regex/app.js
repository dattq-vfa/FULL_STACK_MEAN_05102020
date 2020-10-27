//regular expression

//1. pattern (regex)
//2. subject (du lieu nguoi dung)
//3. cong thuc ()
//  3.1 test
//      if(pattern.test(subject)){
//          return true;} 
//      else{
//          return false;}

//  3.2 match
    // if(subject.match(pattern))
    // {
    //     return true;
    // }
    // else
    // {
    //     return false;
    // }
//ghi chú:
//1. 1 chuỗi pattern bắt buộc có dấu / /
//2. ^: bắt đầu một ký tự
//3. $:kết thúc một ký tự
//4. phân chữ biệt hoa thường
//5. [0-9]: toàn bộ số từ 0-9
//6. [a-z]: toàn bộ chữ thường
//7. [A-Z]: toàn bộ chữ hoa.
//8. {min,max}: min là số thấp nhất để điền vào chuỗi và ngược lại
//9. *: chấp nhận rỗng đến vô hạn ex:/[A-Z]*$/
//10. +: chấp nhận ít nhất 1 chữ hoặc số đến vô hạn
//11. ?: chấp nhận 1 chữ hoặc số hoặc rỗng
//12. .: bất kỳ kí tự nào
//13. |: hoặc
//14. gom nhóm:(A|B)

// pattern =/^(.)*$/; //regular expression //{1,5} chấp nhận từ 1 đến 5 ký tự  
// subject='adf'; //du lieu nguoi dung
// if(pattern.test(subject))
// {
//     console.log('true');
// } 
// else{
//     console.log('false');
// }

//bai tập kiểm tra sdt theo cú pháp
//10 hoặc 11 số
//0000-000-000
//0000-000-0000

//pattern =/\(?([0-9]{4})\)?([ .-]?)([0-9]{3})\2([0-9]{3,4})/; //regular expression //{1,5} chấp nhận từ 1 đến 5 ký tự  
// pattern =/^[0-9]{4}-[0-9]{3}-([0-9]{3,4})/;
// subject='0000-000-000'; //du lieu nguoi dung

//kiểm tra email
//gchsgdh@gmail.com(or co)
// pattern =/^([0-9]|[a-z]|[A-Z]){3,}\@gmail.(com|co)$/;//{3,} từ 3 ký tự đến vô hạn
//hoặc
// pattern =/^\w{3,}\@gmail.(com|co)$/;
// subject='xvd@gmail.com'; //du lieu nguoi dung
pattern = /^[0-9]{4}[ -.][0-9]{3}[ -.][0-9]{3,4}/
subject ='0000.000.000';
if(pattern.test(subject))
{
    console.log('true');
} 
else{
    console.log('false');
}