/**
 * Created by Jun on 2016-03-23.
 */
var users = require('../controllers/server.user.controller'),
    memos = require('../controllers/server.memo.controller'),
    board = require('../controllers/server.board.controller');

module.exports = function(app){
    app.route('/api/main/:boardId/memo').
        get(users.requiresLogin, memos.memoList).
        post(users.requiresLogin, memos.create).
        put(memos.updateList);

    app.route('/api/main/:boardId/memo/:memoId').
        get(users.requiresLogin, memos.read).
        put(users.requiresLogin, memos.hasAuthorization, memos.update).
        delete(users.requiresLogin, memos.hasAuthorization, memos.delete);

    app.route('/api/files/:memoId').
        post(memos.fileUpload);

    app.route('/api/files/:memoId/:fileId').
        get(memos.fileDownload).
        delete(memos.deleteFile);

    app.route('/api/memos/colorUpdate').
        put(memos.colorUpdate);

    app.get('/api/files/:memoId/:fileId/view', memos.viewFile);

    app.param('boardId', board.boardById);
    app.param('memoId', memos.memoById);
};

//소속 보드 추가