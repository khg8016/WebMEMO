/**
 * Created by Jun on 2016-03-31.
 */

angular.module('board').config(['$routeProvider',
    function($routeProvider){
        $routeProvider.when('/main', {
            templateUrl : 'board/views/client.board.main.html'
        }).when('/main/:boardId/memo', {
            templateUrl : 'board/views/client.board.view.html'
        }).when('/main/:boardId/memo/:memoId/view', {
            templateUrl : 'memo/views/client.memo.view.html'
        }).when('/main/:boardId/memo/:memoId/edit', {
            templateUrl : 'memo/views/client.memo.edit.html'
        }).otherwise({
            redirectTo: '/main'
        });
    }
]);