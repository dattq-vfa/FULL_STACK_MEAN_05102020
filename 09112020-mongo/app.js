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
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})// nho nhap pass va ten 
//thanh cong
.then(()=> console.log('thanh cong'))
//that bai bao loi
.catch((err)=>(console.log(err)));

//tao schema
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
        status: Boolean,

 });
 //tao collection
 mongoose.model('user', UserSchema);


