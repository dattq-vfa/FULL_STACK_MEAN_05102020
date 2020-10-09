//console.log(1)

// kieu du lieu

// String
    //1.khai bao
     var a = 'hello';
    //2.cach su dung
    //console.log(a);
    //3. Ham su dung


// Number
    // var b =5;
    // console.log(b);
// Array
    //1.khai bao (2 cach)
        //1.1cach 1
        //var c = [1,2,3,4];
        //1.2cach2
       // var c2 = new Array(1,2,3,4);
        //2.su dung
        //console.log(...c);
// Object
    var d = {
        name:'nguyen van b',
        age: 9,
        sum: function(){
            return `ten la: ` + this.name + `, tuoi la: ` + this.age;
        }
    }
     //console.log(d.sum());
// Boolean

//underfined
//null

//khai bao bien
//let,var, const

//xuat du lieu
//console.log
//alert()
//document.write
// document.getelementByid('').inerHtml = ;

// operator

var a1 = 5;
var a2 = 6;
var a3 = a1 + a2;// ** binh phuong 

//console.log(a3);

var b1 = 10;
var b2 = b1++;
var b3 = ++b1;
//console.log(b3); 
var e1 = 2;
var e2 = 3;
var kq = '';
(e1==e2) ? kq='D' : kq = 'S'; // kieu nay thay cho if...else  //=== so sanh cung gia tri va kieu du lieu
//console.log(kq);

//logic

// ham

//1.Khai bao 
function sum()
{
    return '1 + 1';
}
//2.su dung
//console.log(sum());

//truyen tham so
//1.khai bao
function tong(a,b)
{
    return a+b;
}
//console.log(tong(2,4));

// arrow function

// 1
sum = function(){
    return 'sum';
}
//2
sum = () => {
    return 'sum';
}
//3
sum = () => 'sum'; // tra ve 1 gia tri

// Giai phuong trinh bac 1: ax +b =0

function ptb1(a,b){
    if(a==0)
    {
        (b==0) ? x='Vo so nghiem' : x='Vo nghiem';
    }
    else
    {
        (b==0) ? x='Vo so nghiem':x= (-b)/a;
    }
    
    return `ket qua la: ` + x; 
}
 //console.log(ptb1(2,2));

//Giai ptb2: ax^2 +bx + c = 0
 function ptb2(a,b,c) {
     var A = (b**2 - 4*a*c) //den ta
     if(A<0)
     {
        return `Vo nghiem`
     }
     else
     {
        if(a==0){x=ptb1(b,c); return `x: ` + x;} 
        else 
        {
           x1 = (-b + Math.sqrt(A))/(2*a)
           x2 = (-b - Math.sqrt(A))/(2*a)
           return `x1: ` + x1 + `, x2: ` +  x2 ;
       }
     }  
 }
//console.log(ptb2(0,0,0))

var arr = [1,2,3,4,5];
//console.log(...arr)

arr.forEach((value,index)=>{
    //console.log(value);
});
