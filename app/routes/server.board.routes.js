/**
 * Created by Jun on 2016-03-31.
 */

var board = require('../controllers/server.board.controller'),
    users = require('../controllers/server.user.controller');


module.exports = function(app){

    app.route('/api/main').
        get(users.requiresLogin ,board.boardList).
        post(users.requiresLogin, board.create);

    app.route('/api/main/:boardId').
        get(users.requiresLogin, board.read).
        post(users.requiresLogin, board.addMember).
        put(users.requiresLogin, board.hasAuthorization, board.update).
        delete(users.requiresLogin, board.hasAuthorization, board.delete);

    app.get('/webmemo', board.renderBoard);

    app.param('boardId', board.boardById);

};