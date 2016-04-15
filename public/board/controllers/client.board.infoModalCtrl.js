/**
 * Created by Jun on 2016-04-10.
 */

angular.module('board').controller('infoModalController', ['$scope', '$location', '$routeParams', 'close', 'Board',
    function($scope, $location, $routeParams, close, Board) {

        $scope.board = Board.get({boardId : $routeParams.boardId});
        $scope.close = function (result) {
            close(result, 100);
            $location.path('/main/' + $routeParams.boardId + "/memo");
        };
    }
]);