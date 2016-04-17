/**
 * Created by Jun on 2016-04-10.
 */

angular.module('board').controller('infoModalController', ['$scope', '$location', '$stateParams', 'close', 'Board',
    function($scope, $location, $stateParams, close, Board) {

        $scope.board = Board.get({boardId : $stateParams.boardId});
        $scope.close = function (result) {
            close(result, 100);
            $location.path('/main/' + $stateParams.boardId + "/memo");
        };
    }
]);