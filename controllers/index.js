"use strict";
const Books = require("../models/books");

module.exports = function (router) {
    router.get("/", function (req, res) {
        Books.find({}, function (err, books) {
            if (err) {
                console.log(err);
            }
            books.forEach((book) => (book.truncText = book.truncText(50)));
            res.render("index", { books: books });
        });
    });
};
