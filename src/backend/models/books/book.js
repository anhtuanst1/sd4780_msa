/**
 * Created by Anhtuanst1
 */
const mongoose = require('mongoose');

const BookModel = mongoose.model('Book', {
    title : {
        type: String,
        trim: true,
        required: true
    },
    description : {
        type: String,
        trim: true
    },
});

module.exports = {BookModel};
