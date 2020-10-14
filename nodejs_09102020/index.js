const { rejects } = require('assert');
const { error } = require('console');
const { promises } = require('dns');
// function a(vb1,c1) {
//     setTimeout(function(){
//         console.log(vb1);
//         c1();
//     },2000);
    
// }

// function b(vb2,c2){
//     setTimeout(function(){
//         console.log(vb2);
//         c2();
//     },5000);
// }

// a('1',()=>{
//     b('2',()=>{
//         a('3',()=>{
//             b('4',()=>{

//             })
//         })
//     })
// });



// // c();
// var kq="";
// function tong (a,b,callback){
//     setTimeout(()=>{
//         kq = a + b;
//         console.log(kq);
//         callback();
//     },3000);   
// }

// function hieu (a,b){
//     setTimeout(()=>{
//         kq = a - b;
//         console.log(kq);
//     },1000);
    
// }

// tong(1,2,()=>{
//     hieu(3,3);
// });

// function testchoi(x,y){
//     setTimeout(()=>{
//         return kq = x+y;
//     },1000);  
// }
// console.log(testchoi(1,2).kq)

//PROMISEE

// var a = new Promise((resolve,reject)=>{
//     var b=6;
//     if(b==5) resolve('b la 5');
//     else reject("err");
//     //resolve('hello');
    
// });

// a
// .then((result1)=> console.log(result1))   //.then la ra ket qua resolve,     .catch reject
// .catch((err)=> console.log(err));

//bat dong bo

// var a = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve('2');
//         console.log(11);
//     },1000);   
// });
// var b = new Promise((resolve,reject)=>{
//     resolve('2');  
// });

// a
// .then((result1)=> b)
// .then((result2)=> console.log(result2))   //.then la ra ket qua resolve,     .catch reject
// .catch((err)=> console.log(err));

//async await khi bi promise hell 
// function a(){
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             resolve('11');         
//         },1000);
//     });
// }
// function b(){
//     return new Promise((resolve,reject)=>{
//         resolve('2'); 
//     }); 
// }

// async function kq(){ ////////// bo async await vao truoc funtion, nho moi funtion phai resolve no moi chay funtion tiep theo, async await tra ve 1 funtion
//     console.log(await a());
//     console.log(await b());
// }
// kq();



// function a(){
//     return  new Promise((resolve,reject)=>{
//     resolve('true')})
//     .then((result1)=> console.log(result1))
//     .catch((err)=> console.log(err));
// }
// function b(){
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             var b=7;
//             (b==5) ? resolve('true'): reject('err');
//         },3000)   
//     }) 
//     .then((result1)=> console.log(result1))
//     .catch((err)=> console.log(err));
// }       

// async function kq(){ ////////// bo async await vao truoc funtion, nho moi funtion phai resolve no moi chay funtion tiep theo, async await tra ve 1 funtion
//     await a();
//     await b();
// }
// kq();

//test choi
    // function chan(){
        
    //     return new Promise((resolve,reject)=>{
    //                 setTimeout(()=>{
    //                     (0%2==0) ? resolve("chan"): reject('err');
    //                 })   
    //             },1000) 
    //             .then((result1)=> console.log(result1))
    //             .catch((err)=> console.log(err));
    // }
    // function le(){
        
    //     return new Promise((resolve,reject)=>{
    //         setTimeout(()=>{
    //             (1%2!=0) ? resolve("le"): reject('err');
    //         })   
    //     },30000) 
    //     .then((result1)=> console.log(result1))
    //     .catch((err)=> console.log(err));
    // }
    // async function inra (){
    //     await chan();
    //     await le();
    // }
    // inra();
    // for(var i = 0; i < 5; ++i) {
    //     (function(x) {
    //         setTimeout(function () { console.log(x); }, 2000);
    //     })(i);
    // }

    //promise khoa pham

// let test = new Promise((resolve,reject)=>{
//     //resolve('ok');
//     reject('loi');
// })
// test.then(e=> console.log(e))
// .catch(h=>console.log(h));

// let add = (a,b)=>{
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             if(typeof a !="number" || typeof b !="number"){
//                 return reject("khong pai number");
//             }
//             resolve(a+ b);
//         },3000);
//     });
// }
// add(4,5)
// .then(e=>console.log(e))
// .catch(l=>console.log(l));
// var fs = require('fs');

// //fs.appendFileSync('hi.txt','hello em');
// let readfile = filename=>{
//     return new Promise((resolve,reject)=>{
//       var a=  fs.readFileSync(filename,'utf-8');
//       resolve(a);
//     });
    
// }
// readfile('./hi.txt')
// .then(h=>console.log(h))
// .catch(b=>console.log(b));
let tong =(a,b)=>{
  return new Promise((resolve,reject)=>{
    if(typeof a !="number"|| typeof b!="number"){
      return reject(new Error('khong phai la 1 so'));
    }
    resolve(a+b);
  });
}
let hieu =(a,b)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      if(a==5) return reject(new Error('a = 5'));
      resolve(a-b);
    },3000);

  });
}

let kq = async(a,b)=>{

    let t1 = await tong(a,b);
    let t2 = await hieu(t1,2); 
    return Promise.resolve(t2);
}
kq(4,2)
.then(rs=>console.log(rs))
.catch(er=>console.log(er + ''));

// Promise.race([hieu(5,2),tong(5,2)])
// .then(rs=>console.log(rs))
// .catch(er=>console.log(er + ''));

// tong(5,2)
// .then(tru=>hieu(tru,100))
// .then(result=>console.log(result))
// .catch(tmp=>console.log(tmp +''));
