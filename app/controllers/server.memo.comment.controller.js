/**
 * Created by Jun on 2016-04-15.
 */

var mongoose = require('mongoose');

module.exports.createComment = function(req ,res){
    var memo = req.memo,
        comment = {
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

    var memo = req.memo,
        commentId = req.params.commentId,
        comments = memo.comments,
        response_comment;

    for(var i= 0, len = comments.length; i< len; i++){
        if(comments[i].id === commentId) {
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
            res.json(response_comment);
        }
    });

};

module.exports.deleteComment = function(req ,res){
    var memo = req.memo,
        commentId = req.params.commentId,
        comments = memo.comments;

    for(var i in comments){
        if(comments[i]._id === commentId) {
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
