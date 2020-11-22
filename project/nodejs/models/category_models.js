const mongoose = require('mongoose');

const Schema = mongoose.Schema;

 const CategorySchema = new Schema({
        name:{
            type: String,
            unique: true,
        },
        link:{
            type: String,
            unique: true,
        },
        father: String,
        id_user: mongoose.Schema.Types.ObjectId,
        status: {
            type: Boolean,
            default: false
        }
 });
 //tao collection
 module.exports = mongoose.model('category', CategorySchema);


