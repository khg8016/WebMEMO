/**
 * Created by Jun on 2016-03-31.
 */

angular.module('board').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise('/main');

        $stateProvider
            .state('board', {
                url: '/main',
                templateUrl: 'board/views/client.board.main.html',
                controller: 'boardController'
            })
            .state('board_memo', {
                url: '/main/:boardId/memo',
                templateUrl: 'board/views/client.board.view.html',
                controller: 'boardController'
            })
            .state('board_memo.view', {
                url: '/:memoId',
                controller: 'boardController',
                onEnter: function (ModalService) {
                    ModalService.showModal({
                        templateUrl: 'memo/views/client.memo.modalView.html',
                        controller: "memoModalController"
                    }).then(function(modal) {
                        modal.element.modal();
                    });
                }
            });
    }
]);
