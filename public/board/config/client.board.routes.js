/**
 * Created by Jun on 2016-03-31.
 */

angular.module('board').config(['$routeProvider',
    function($routeProvider){
        $routeProvider.when('/main', {
            templateUrl : 'board/views/client.board.main.html'
        }).when('/main/create', {
            templateUrl : 'board/views/client.board.create.html'
        }).when('/main/:boardId/addMember', {
            templateUrl : 'board/views/client.board.addMembers.html'
        }).when('/main/:boardId/edit', {
            templateUrl : 'board/views/client.board.edit.html'
        }).when('/main/:boardId/', {
            templateUrl : 'board/views/client.board.view.html'
        })
    }
]);