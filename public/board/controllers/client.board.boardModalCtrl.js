/**
 * Created by Jun on 2016-04-06.
 */
angular.module('board').controller('boardModalController', ['$rootScope','$scope', '$location', '$stateParams','close', 'Board', 'BoardInformation',
    function($rootScope, $scope, $location, $stateParams, close, Board, BoardInformation) {

        $scope.boardInfo = BoardInformation;

        $scope.close1 = function(result) {
            close(result, 100);
            $location.path('/main');
            this.boardInfo.toggle = false;
        };

        $scope.close2 = function(result) {
            close(result, 100);
            $location.path('/main/' + $stateParams.boardId+ "/memo");
            this.boardInfo.toggle = false;
        };

        $scope.create = function(){ //보드 생성
            var board = new Board({
                name : this.name
            });

            board.$save(function(board){
                $scope.boardInfo.toggle = false;
                close(100);
                $rootScope.$emit('$boardCreate', board);
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.addMember = function(req, res){
            var user = new Board({
                username : this.username
            });

            user.$save({boardId : $stateParams.boardId}, function(response){
                $scope.message = "추가되었습니다.";
                $scope.username = "";
                $scope.boardInfo.toggle = false;
            }, function(errorResponse){
                $scope.message = errorResponse.data.message;
            });
        };


    }
]);