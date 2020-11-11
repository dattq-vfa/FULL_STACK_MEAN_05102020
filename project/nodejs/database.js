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