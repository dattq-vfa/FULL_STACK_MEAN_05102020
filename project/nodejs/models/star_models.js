const mongoose = require('mongoose');

const Schema = mongoose.Schema;

 const StarSchema = new Schema({
        id_product: mongoose.Schema.Types.ObjectId,
        id_user: mongoose.Schema.Types.ObjectId,
        star: {
            type: Number,
            default: 0
        },
 });
 //tao collection
 module.exports = mongoose.model('star', StarSchema);

// danh gia sao
// tao 1 bang star : id_user, id_product, star
