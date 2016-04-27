/**
 * Created by Jun on 2016-04-06.
 */
angular.module('board').controller('boardRenameController', ['$scope', '$location', '$stateParams','close', 'board', 'BoardInformation',
    function($scope, $location, $stateParams, close,  board, BoardInformation) {

        $scope.boardInfo = BoardInformation;
        $scope.board = board;

        $scope.close = function(result) {
            close(result, 100);
            $location.path('/main/' + $stateParams.boardId+ "/memo");
            $scope.boardInfo.toggle = false;
        };

        $scope.update = function(){//보드 이름 바꾸기
            $scope.board.$update(function(board){
                $scope.boardInfo.toggle = false;
                close(100);
                $scope.boardInfo.name = board.name;
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);