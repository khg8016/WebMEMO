/**
 * Created by Jun on 2016-04-10.
 */

angular.module('board').controller('infoModalController', ['$scope', '$location', '$stateParams', 'close', 'board',
    function($scope, $location, $stateParams, close, board) {

        $scope.board = board;
        $scope.close = function (result) {
            close(result, 100);
        };
    }
]);