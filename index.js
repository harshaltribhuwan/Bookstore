"use strict";

var express = require("express");
var kraken = require("kraken-js");
const flash = require("connect-flash");
// const mongoose = require("mongoose");
const db = require("./lib/db");

var options, app;

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
    onconfig: function (config, next) {
        /*
         * Add any additional config setup or overrides here. `config` is an initialized
         * `confit` (https://github.com/krakenjs/confit/) configuration object.
         */
        db.config();
        next(null, config);
    },
};

app = module.exports = express();
app.use(kraken(options));
app.use(flash());
app.use(function (req, res, next) {
    var messages = require("express-messages")(req, res);
    res.locals.messages = function (chunk, context, bodies, params) {
        return chunk.write(messages());
    };
    next();
});
app.on("start", function () {
    console.log("Application ready to serve requests.");
    console.log("Environment: %s", app.kraken.get("env:env"));
});
