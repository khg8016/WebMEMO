/**
 * Created by Jun on 2016-03-17.
 */
var express = require('express'),
    config = require('./config'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    session = require('express-session'),
    passport = require('passport'),
    methodOverride = require('method-override'),
    flash = require('connect-flash'),
    http = require('http'),
    multipart  = require('connect-multiparty');

module.exports = function(db){
    var app = express();
    var server = http.createServer(app);

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }
    app.use(multipart());


    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    app.use(flash());

    app.use(passport.initialize());
    app.use(passport.session());


    app.set('views', './app/views');
    app.set('view engine', 'jade');


    require('../app/routes/server.board.routes')(app);
    require('../app/routes/server.index.routes')(app);
    require('../app/routes/server.memo.routes')(app);
    require('../app/routes/server.comment.routes')(app);


    app.use(express.static('./public'));

    return server;
};