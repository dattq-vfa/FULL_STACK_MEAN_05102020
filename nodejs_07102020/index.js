// Giai phuong trinh bac 1: ax +b =0
var kq="";
class giaipt {
    ptb1(a,b){
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
    ptb2(a,b,c){
        var x1="",x2="";
        var denta = b*b -4*a*c;
        if(a==0) {this.ptb1(b,c)}
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
        return kq;
    }
}
var pt = new giaipt();
console.log(pt.ptb2(0,0,0))
// function ptb1(a,b){
//     if(a==0)
//     {
//         (b==0) ? x='Vo so nghiem' : x='Vo nghiem';
//     }
//     else
//     {
//         (b==0) ? x='Vo so nghiem':x= (-b)/a;
//     }
    
//     return `ket qua la: ` + x; 
// }
//  //console.log(ptb1(2,2));

// //Giai ptb2: ax^2 +bx + c = 0
//  function ptb2(a,b,c) {
//      var A = (b**2 - 4*a*c) //den ta
//      if(A<0)
//      {
//         return `Vo nghiem`
//      }
//      else
//      {
//         if(a==0){x=ptb1(b,c); return `x: ` + x;} 
//         else 
//         {
//            x1 = (-b + Math.sqrt(A))/(2*a)
//            x2 = (-b - Math.sqrt(A))/(2*a)
//            return `x1: ` + x1 + `, x2: ` +  x2 ;
//        }
//      }  
//  }
// //console.log(ptb2(0,0,0))

// var arr = [1,2,3,4,5];
// //console.log(...arr)

// arr.forEach((value,index)=>{
//     //console.log(value);
// });

// class chucnang{
//     index(){
//         return 'hello';
//     }
// }
// class toan{
//     ptb1(a,b){
//         var x="";
//         if(a==0)
//         {
//             (b==0) ? x='Vo so nghiem' : x='Vo nghiem';
//         }
//         else
//         {
//             (b==0) ? x='Vo so nghiem': x= (-b)/a;
//         }
        
//         return `ket qua la: ` + x; 
//     }
//      //console.log(ptb1(2,2));
    
//     //Giai ptb2: ax^2 +bx + c = 0
//     ptb2(a,b,c) {
//         var x1="",x2="";
//          var A = (b**2 - 4*a*c) //den ta
//          if(A<0)
//          {
//             return `Vo nghiem`
//          }
//          else
//          {
//             if(a==0){this.ptb1(b,c);} 
//             else 
//             {
//                x1 = (-b + Math.sqrt(A))/(2*a)
//                x2 = (-b - Math.sqrt(A))/(2*a)
//                return `x1: ` + x1 + `, x2: ` +  x2 ;
//            }
//          }  
//      }
//     //console.log(ptb2(0,0,0))
// }
// var kq =new toan();
// //console.log(kq.index());
// console.log(kq.ptb2(0,1,0));

// //1,phong kinh doanh
//     //tim kiem khach hang
//     //tinh luong
// //2,phong ke toan 
//     //kiem toan
//     //tinh luong
// //1,phong nhan su
//     //tuyen nhan su
//     //tinh luong
// //=> chuc nang chung tinh luong
// class tinhluongcty{
//     tinhluong() //chuc nang
//     {
//         return 'tinh luong';
//     }
// }
// class phongkinhdoanh extends tinhluongcty{
//     timkhachhang()
//     {
//         return 'tim khach hang';
//     }
// }
// class phongketoan extends tinhluongcty{
//     kiemtoan()
//     {
//         return 'kiem toan';
//     }
// }
// class phongnhansu extends tinhluongcty{
//     tuyennhansu()
//     {
//         return 'tuyen nhan su';
//     }
// }
// var kq = new phongketoan();
// //console.log(kq.kiemtoan())




