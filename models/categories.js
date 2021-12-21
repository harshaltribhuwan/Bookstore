const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
    name: String,
});

const Categories = mongoose.model("Categories", categoriesSchema);

module.exports = Categories;
