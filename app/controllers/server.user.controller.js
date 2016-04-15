/**
 * Created by Jun on 2016-03-21.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport');

var getErrorMessage = function(err){ //err은 mongoose error 객체. singup 페이지에서 가입시 db에 문제 있을 경우 해당 메세지를 flash 객체에 넣어주고 view에 띄워줌
    var message = '';

    if(err.code){
        switch(err.code){//mongodb index error 처리
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    }else{//mongoose 검증 오류 처리
        for (var errName in err.errors){
            if(err.errors[errName].message)
                message = err.errors[errName].message;
        }
    }

    return message;
};

module.exports.index = function(req, res){
    var message = req.flash('error')[0];
    console.log("render index");
    res.render('index', {
            user : JSON.stringify(req.user) || 'undefined'
        });
};

module.exports.signUp = function(req, res, next){

    if(!req.user) {
        var user = new User(req.body);
        user.newSalt();
        user.password = user.hashPassword(user.password);
        user.save(function (err) {
            if (err) {
                var message = getErrorMessage(err);
                req.flash('error', message);
                return res.send(200,{'Content-Type' : 'text/html', 'msg' : message});
            }
            req.login(user, function (err1) { //이걸 실행하면 serialze 메서드가 실행되고 serialize에서 사용자 세션(req.user) 생성.passport.authenticate()메서드 사용할 때 자동으로 호출되기도 함.
                console.log("login");
                if (err1) {
                    console.log("login error");
                    return next(err1);
                }
                res.send(200, {msg : ""});
            });

        });

    }else{
        res.redirect('/#!/main');
    }
};

module.exports.signOut = function(req, res, next){
    if(req.user) req.logout();
    res.redirect('/');
};

module.exports.requiresLogin = function(req, res, next){
    if(!req.isAuthenticated()){
        return res.status(401).send({
            message: 'User is not logged in'
        });
    }
    next();
};
