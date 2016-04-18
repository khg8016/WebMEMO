/**
 * Created by Jun on 2016-04-06.
 */
angular.module('board').controller('boardRenameController', ['$scope', '$location', '$stateParams','close', 'Board', 'BoardInformation',
    function($scope, $location, $stateParams, close, Board, BoardInformation) {

        $scope.board = Board.get({boardId : $stateParams.boardId});
        $scope.boardInfo = BoardInformation;

        $scope.close = function(result) {
            close(result, 100);
            $location.path('/main/' + $stateParams.boardId+ "/memo");
            this.boardInfo.count --;
        };

        $scope.update = function(){//보드 이름 바꾸기
            $scope.board.$update(function(board){
                $scope.boardInfo.count--;
                close(100);
                $scope.boardInfo.name = board.name;
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);