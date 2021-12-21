"use strict";
require("dotenv").config();
const mongoose = require("mongoose");

const db = function () {
    return {
        config: function (conf) {
            mongoose.connect(process.env.MONGO_URI);
            const db = mongoose.connection;
            db.on("error", console.error.bind(console, "Connection Error"));
            db.once("open", function () {
                console.log("DB connectios open....");
            });
        },
    };
};

module.exports = db();
