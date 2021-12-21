const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    author: String,
    publisher: String,
    price: Number,
    cover: String,
});

booksSchema.methods.truncText = function (length) {
    return this.description.substring(0, length);
};

const Books = mongoose.model("Books", booksSchema);

module.exports = Books;
