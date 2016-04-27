/**
 * Created by Jun on 2016-04-15.
 */

var users = require('../controllers/server.user.controller'),
    comment = require('../controllers/server.memo.comment.controller'),
    board = require('../controllers/server.board.controller'),
    memos = require('../controllers/server.memo.controller');

module.exports = function(app){

    app.route('/comment/:boardId/:memoId').
        get(comment.readComments).
        post(users.requiresLogin, comment.createComment);

    app.route('/comment/:boardId/:memoId/:commentId').
        put(users.requiresLogin, comment.updateComment).
        delete(users.requiresLogin, comment.deleteComment);

    app.param('boardId', board.boardById);
    app.param('memoId', memos.memoById);
};