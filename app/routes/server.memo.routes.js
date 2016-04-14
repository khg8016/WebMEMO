/**
 * Created by Jun on 2016-03-23.
 */
var users = require('../controllers/server.user.controller'),
    memos = require('../controllers/server.memo.controller'),
    board = require('../controllers/server.board.controller');

module.exports = function(app){
    app.route('/api/main/:boardId/memo').
        get(users.requiresLogin, memos.memoList).
        post(users.requiresLogin, memos.create);

    app.route('/api/main/:boardId/memo/:memoId').
        get(users.requiresLogin, memos.read).
        put(users.requiresLogin, memos.hasAuthorization, memos.update).
        delete(users.requiresLogin, memos.hasAuthorization, memos.delete);

    app.route('/comment/:boardId/:memoId').
        get(memos.getComments).
        post(users.requiresLogin, memos.addComment);

    app.route('/comment/:boardId/:memoId/:commentId').
        put(users.requiresLogin, memos.updateComment).
        delete(users.requiresLogin, memos.deleteComment);

    app.param('boardId', board.boardById);
    app.param('memoId', memos.memoById);
    app.param('commentId', memos.commentById);

};

//소속 보드 추가