/**
 * Created by Aplus on 2016-02-16.
 */
'use strict';

var passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    user = require('mongoose').model('User');

module.exports = function() {
    // Use the Passport's Local strategy
    passport.use(new localStrategy(function(username, password, done) {
        user.findOne({
            username: username
        }, function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, {
                    message: '존재하지 않는 ID 입니다.'
                });
            }

            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: '비밀번호를 다시 확인해주세요.'
                });
            }

            return done(null, user);
        });
    }));
};