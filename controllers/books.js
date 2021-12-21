"use strict";

// exports.getIndexPage = function (req, res) {
//     res.render("index");
// };

// exports.getDetailPage = function (req, res) {
//     res.render("books/details");
// };
const Books = require("./../models/books");
const Categories = require("./../models/categories");

module.exports = function (router) {
    router.get("/", function (req, res) {
        res.render("index");
    });
    router.get("/details/:id", function (req, res) {
        Books.findOne({ _id: req.params.id }, function (err, book) {
            if (err) {
                console.log(err);
            }
            res.render("books/details", { book: book });
        });
    });
};
