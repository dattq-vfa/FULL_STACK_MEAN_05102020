//1.doc file 
//2.tao file
//3.chinh sua file
//4.xoa file

var fs = require('fs');

//1.doc file
    // fs.readFile(__dirname + '/abc.txt', function(err,data){
    //     console.log(data);
    // });

    // var nd = fs.readFileSync(__dirname + '/abc.txt');//nen su dung
    //     console.log(nd);

//2.tao file

    //fs.appendFile
        // fs.appendFile('append.txt','xin cha0',function(err){
        //     if(err)throw err;
        //     console.log('saved');
        // });
    //fs.open
        // fs.open('open.txt', 'w', function (err, file) {
        //     if (err) throw err;
        //     console.log('Saved!');
        // });
    // //fs.writeFile
    //     fs.writeFile('write.txt', 'Write content!', function (err) {
    //         if (err) throw err;
    //         console.log('Saved!');
    //     });
//3.chinh sua file
        // fs.appendFile('append.txt','append edit',function(err){ //them noi dung moi vao file
        //     if(err)throw err;
        //     console.log('saved');
        // });
        // fs.writeFile('write.txt', 'Write edit!', function (err) {//ghi de vao noi dung
        //     if (err) throw err;
        //     console.log('Saved!');
        // });

//4.xoa file
// fs.unlink('abc.txt', function (err) {
//     if (err) throw err;
//     console.log('File deleted!');
//   });

// //5.Tao folder
    // fs.mkdir('./controllers',err =>{//tao folder
    //     if(err) throw err;
    //     console.log('saved!')
    // })
//Bai tap tao folder
// if (!fs.existsSync('./Bai_tap'))
// {
//     fs.mkdirSync('./Bai_tap')
//     try{
//         fs.mkdirSync('./Bai_tap/controllers')
//         fs.appendFileSync('./Bai_tap/controllers/admin_controllers.js','app js');
//         fs.appendFileSync('./Bai_tap/controllers/index_controlers.js','app js');
//         fs.appendFileSync('./Bai_tap/controllers/login_controllers.js','app js');
//         fs.appendFileSync('./Bai_tap/controllers/product_controllers.js','app js');
//         fs.appendFileSync('./Bai_tap/controllers/productApi_controllers.js','app js');
//         fs.appendFileSync('./Bai_tap/controllers/userApi_controllers.js','app js');
//     fs.mkdirSync('./Bai_tap/models');
//         fs.appendFileSync('./Bai_tap/models/produc_models.js','app js');
//         fs.appendFileSync('./Bai_tap/models/token.js','app js');
//         fs.appendFileSync('./Bai_tap/models/user_models.js','app js');
//     fs.mkdirSync('./Bai_tap/node_modules');
//     fs.mkdirSync('./Bai_tap/public');
        
//     fs.mkdirSync('./Bai_tap/uploads');
//     fs.mkdirSync('./Bai_tap/views');
//     fs.appendFileSync('./Bai_tap/app.js','app js');
//     fs.appendFileSync('./Bai_tap/db.js','db js');
//     fs.appendFileSync('./Bai_tap/packeage.json',' ');
//     fs.appendFileSync('./Bai_tap/package-lock.json','package-lock json');
//     }
//     catch{

//     }
// }
   