/**
 * Created by Jun on 2016-03-21.
 */
var users = require('../../app/controllers/server.user.controller'),
    passport = require('passport');

module.exports = function(app){
    app.get('/', users.index);

    app.post('/signup', users.signUp);

    app.post('/signin', function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.send(200, {msg : "아이디 또는 비밀번호를 다시 확인해주세요"}); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.send(200, {msg: ""});
            });
        })(req, res, next);
    });

    app.get('/signout', users.signOut);

    /*  app.post('/signin', passport.authenticate('local', {
     successRedirect: '/webmemo#!/main',
     failureRedirect: '/#!/signin',
     failureFlash: true
     }));*/

};

