const mongoose = require('mongoose');

const Schema = mongoose.Schema;

 const ProductSchema = new Schema({
        name:{
            type: String,
            unique: true,
        },
        link:{
            type: String,
            unique: true,
        },
        description: String,//text area
        content: String,//ckeditor
        image: String, // anh dai dien
        images: Array, // 1 san pham co nhieu anh
        price: {
            type: Number,
            default: 0
        },
        id_category: mongoose.Schema.Types.ObjectId,
        id_user: mongoose.Schema.Types.ObjectId,
        status: {
            type: Boolean,
            default: false
        }
 });
 //tao collection
 module.exports = mongoose.model('product', ProductSchema);

// danh gia sao
// tao 1 bang star : id_user, id_product, star
