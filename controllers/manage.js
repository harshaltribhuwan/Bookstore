"use strict";
const Books = require("./../models/books");
const Categories = require("./../models/categories");

module.exports = function (router) {
    router.get("/", function (req, res) {
        res.render("manage/index");
    });

    router.get("/books", (req, res) => {
        Books.find({}, function (err, books) {
            if (err) {
                console.log(err);
            }

            res.render("manage/books/index", { books });
        });
    });

    router.get("/books/add", (req, res) => {
        Categories.find({}, function (err, categories) {
            if (err) {
                console.log(err);
            }
            res.render("manage/books/add", { categories: categories });
        });
    });

    router.post("/books", async (req, res) => {
        const {
            title,
            category,
            author,
            publisher,
            price,
            description,
            cover,
        } = req.body;
        if (title == "" || price == "") {
            req.flash("error", "Please fill out required fields");
            res.location("/manage/books/add");
            res.redirect("/manage/books/add");
        }
        if (isNaN(price)) {
            req.flash("error", "Price must be a Number");
            res.location("/manage/books/add");
            res.redirect("/manage/books/add");
        }
        try {
            await Books.create({
                title,
                category,
                author,
                publisher,
                price,
                description,
                cover,
            });
            req.flash("success", "");
            res.location("/manage/books");
            res.redirect("/manage/books");
        } catch (err) {
            console.log("Save Error", err);
        }
    });

    router.get("/books/edit/:id", (req, res) => {
        Categories.find({}, function (err, categories) {
            Books.findOne({ _id: req.params.id }, function (err, book) {
                if (err) {
                    console.log(err);
                }
                res.render("manage/books/edit", { book, categories });
            });
        });
    });

    router.post("/books/edit/:id", (req, res) => {
        const {
            title,
            category,
            author,
            publisher,
            price,
            description,
            cover,
        } = req.body;
        Books.updateOne(
            { _id: req.params.id },
            {
                title,
                category,
                author,
                publisher,
                price,
                description,
                cover,
            },
            function (err) {
                if (err) {
                    console.log("update error", error);
                }
                req.flash("success", "Book Updated");
                res.location("/manage/books");
                res.redirect("/manage/books");
            }
        );
    });

    router.post("/books/delete/:id", (req, res) => {
        Books.deleteOne({ _id: req.params.id }, function (err) {
            if (err) {
                console.log(err);
            }
            req.flash("success", "Book Deleted");
            res.location("/manage/books");
            res.redirect("/manage/books");
        });
    });

    router.get("/categories", (req, res) => {
        Categories.find({}, function (err, categories) {
            if (err) {
                console.log(err);
            }
            res.render("manage/categories/index", { categories: categories });
        });
    });

    router.get("/categories/add", (req, res) => {
        res.render("manage/categories/add");
    });

    router.post("/categories", async (req, res) => {
        const name = req.body.name;
        if (name === "") {
            res.flash("error", "Please fill out required fields");
            res.location("/manage/categories/add");
            res.redirect("/manage/categories/add");
        }
        try {
            await Categories.create({ name: name });
            req.flash("success", "Category Added");
            res.location("/manage/categories/add");
            res.redirect("/manage/categories/add");
        } catch (err) {
            console.log(err);
        }
    });

    router.get("/categories/edit/:id", (req, res) => {
        Categories.findOne({ _id: req.params.id }, function (err, category) {
            if (err) {
                console.log(err);
            }
            res.render("manage/categories/edit", { category });
        });
    });

    router.post("/categories/edit/:id", (req, res) => {
        const name = req.body.name;
        Categories.updateOne(
            { _id: req.params.id },
            { name: name },
            function (err) {
                if (err) {
                    console.log(err);
                }
                req.flash("success", "Category Updated");
                res.location("/manage/categories");
                res.redirect("/manage/categories");
            }
        );
    });

    router.post("/categories/delete/:id", (req, res) => {
        Categories.deleteOne({ _id: req.params.id }, function (err) {
            if (err) {
                console.log(err);
            }
            req.flash("success", "Category Deleted");
            res.location("/manage/categories");
            res.redirect("/manage/categories");
        });
    });
};
