/**
 * Created by Jun on 2016-04-15.
 */

var mongoose = require('mongoose');

module.exports.createComment = function(req ,res){
    var memo = req.memo;

    var comment = {
        _id : new mongoose.Types.ObjectId(),
        content : req.body.content,
        created : Date.now(),
        creator : req.user
    };

    memo.comments.push(comment);

    memo.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else{
            res.json(comment);
        }
    });
};

module.exports.readComments = function(req ,res){
    res.json(req.memo.comments);
};

module.exports.updateComment = function(req ,res){

    var memo = req.memo;
    var comment = req.comment;
    var comments = memo.comments;
    var response_comment;

    for(var i in comments){
        if(comments[i].id === comment.id) {
            comments[i].content = req.body.content;
            comments[i].created = Date.now();
            response_comment = comments[i];
        }
    }

    memo.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else{
            console.log("update save success");
            res.json(response_comment);
        }
    });

};

module.exports.deleteComment = function(req ,res){
    var memo = req.memo;
    var comment = req.comment;
    var comments = memo.comments;

    for(var i in comments){
        if(comments[i].id === comment.id) {
            comments.splice(i, 1);
        }
    }

    memo.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(memo);
        }
    });
};

module.exports.commentById = function(req, res, next, id){
    var comments = req.memo.comments;

    for(var i in comments){
        if(comments[i].id === id) {
            req.comment = comments[i];
        }
    }
    next();
};