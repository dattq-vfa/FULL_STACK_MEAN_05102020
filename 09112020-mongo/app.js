//1. là 1 cơ sở dữ liệu document mã nguồn mở
    // (Cơ sở dữ liệu là nơi lưu trữ dữ liệu 
    //và truy xuất dữ liệu, hỗ trợ những hàm để thực hiện việc thêm xóa,... tìm kiếm dữ liệu)
//2. là 1 dạng csdl NoSQL
//3. Mỗi collection đã có sẵn Primary Key: mặc định _id (_id : object ID: gom so va chuoi)
//4. Lưu dữ liệu dưới dạng json: {key : value}
//5. Để kết nối và thao tác các hàm thêm, sữa, xóa,...
// sử dụng thư viện: mongoose
//6. Kieu du lieu mongodb
    //string
    //Number
    //boolean
    //double
    //Min/max key
    //array
    //Timestamp
    //Object
    //Null
    //Symbol
    //Date
    //Object ID
    //Binary data
    //Code
    //Regular expression

//7 tao cau truc cho collection: Schema
//8. Tao collection: Model

//goi mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://quangdattruong:Dat1@quang@cluster0.zdhkx.mongodb.net/Mean05102020?retryWrites=true&w=majority', {
    useNewUrlParser: true,//Tránh cảnh báo "trình phân tích chuỗi URL hiện tại không được dùng nữa"
    useUnifiedTopology: true,
    useCreateIndex: true
})// nho nhap pass va ten 
//thanh cong
.then(()=> console.log('thanh cong'))
//that bai bao loi
.catch((err)=>(console.log(err)));

//tao schema các trường giống  như format từng cột database
 const Schema = mongoose.Schema;

 const UserSchema = new Schema({
        name: String,
        username: {
            type: String,
            unique: true //primarykey
        },
        password: String,
        email: {
            type: String,
            unique: true
        },
        phone: {
            type: String,
            unique: true
        },
        address: String,
        Role: Array,
        status: {
            type: Boolean,
            default: false
        }

 });

 //tao collection
 const UserModel = mongoose.model('user', UserSchema);

 

// thêm document, giống như thêm data vào bảng
    //1.save
    //2.create

    //1.save
        // obj = new UserModel({
        //     name: 'nguyen van B',
        //     username: 'nguyenvanB',
        //     password: '123456',
        //     email: 'nguyenvanb@gmail.com',
        //     phone: '913898928391',
        //     address: 'TPHCM',
        //     Role: [1,2],
        // });
        // obj.save((err,data)=>{
        //     if(err)
        //     {
        //         console.log(err);
        //     }
        //     else
        //     {
        //         console.log(data);
        //     }
        // });

    //2.create
        // object = [
        //     {
        //         name: 'nguyen van H',
        //         username: 'nguyenvanhH',
        //         password: '123456232',
        //         email:'nguyenvansH@gmail.c0m',
        //         phone: '189389121212'
        //     },
        //     {
        //         name: 'nguyen van L',
        //         username: 'nguyenvanL',
        //         password: '123456',
        //         email:'nguyenvanL@gmail.c0m',
        //         phone: '189323281122129'
        //     },

        // ]
        // UserModel.create(object,(err,data)=>{
        //     if(err)
        //     {
        //         console.log(err);
        //     }
        //     else
        //     {
        //         console.log(data);
        //     }
        // });

//3.Cập nhật
    // obj = {
    //         name: 'nguyen van C',
    //         };
    // UserModel.updateMany({ _id:'5fabe6b8cbf82217d4b2e8ed'},obj,(err,data)=>{
    //         if(err)
    //         {
    //             console.log(err);
    //         }
    //         else
    //         {
    //             console.log(data);
    //         }
    // });

//4.xoa du lieu
    // UserModel.findByIdAndDelete({ _id:'5fabe564e31ee70a0cb1dabc'},(err,data)=>{
    //         if(err)
    //         {
    //             console.log(err);
    //         }
    //         else
    //         {
    //             console.log(data);
    //         }
    // });

//Lay du lieu
    // UserModel.find()
    // .exec((err,data)=>{
    //         if(err)
    //         {
    //             console.log(err);
    //         }
    //         else
    //         {
    //             console.log(data);
                
    //         }
    // });

// tim kiem
    // UserModel.find({name: {'$regex': 'nguyen van'} })
    // .exec((err,data)=>{
    //         if(err)
    //         {
    //             console.log(err);
    //         }
    //         else
    //         {
    //             console.log(data);
    //         }
    // });

//sap xep, A->Z : 1(Ko can them sort), Z->A : -1
    // UserModel.find()
    // .sort({name: -1}) 
    // .exec((err,data)=>{
    //         if(err)
    //         {
    //             console.log(err);
    //         }
    //         else
    //         {
    //             console.log(data);
    //         }
    // });

//phan trang, skip limit hoat dong giong nhu substring
    // UserModel.find()////sort truoc phan trang sau
    // .skip(2)//vi tri bat dau
    // .limit(1)//gioi han so document hien thi ra
    // .sort({name: -1}) 
    // .exec((err,data)=>{
    //         if(err)
    //         {
    //             console.log(err);
    //         }
    //         else
    //         {
    //             console.log(data);
    //         }
    // });