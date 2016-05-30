/**
 * Created by Jun on 2016-03-21.
 */


process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express');
var mongoose = require('./config/mongoose');
var passport = require('./config/passport');

var db = mongoose();
var app = express(db);
var passport = passport();

app.listen(3000);

console.log("Server is running at http://54.186.77.165:3000/");

module.exports = app;