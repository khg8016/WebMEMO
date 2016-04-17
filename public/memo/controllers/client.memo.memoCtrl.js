/**
 * Created by Jun on 2016-03-30.
 */

angular.module('memo').controller('memoController', ['$scope', '$stateParams', '$location', 'ModalService','Authentication', 'Memos', 'Board',
    function($scope, $stateParams, $location, ModalService, Authentication, Memos, Board){
        $scope.authentication = Authentication;
        $scope.boardId = $stateParams.boardId;
        $scope.find = function(){
            $scope.memos = Memos.query({boardId: $stateParams.boardId});
        };

        $scope.findOne = function(){
            $scope.memo = Memos.get({boardId: $stateParams.boardId,
                                      memoId : $stateParams.memoId});
        };

        $scope.findBoard = function(){ //특정 보드 찾음
            console.log("find in memo");
            $scope.board = Board.get({boardId : $stateParams.boardId});
        };

        $scope.create = function(){
            var memo = new Memos({
                title : this.title,
                contents : this.contents
            });
            memo.$save({boardId: $stateParams.boardId}, function(response){
                $location.path('/main/' + $stateParams.boardId + '/memo');
            }, function(errorResponse){
               $scope.error = errorResponse.data.message;
            });
        };

        $scope.delete = function(memo){
            if(memo){
                memo.$remove({boardId: $stateParams.boardId},
                    function(){
                    for(var i in $scope.memos){
                        if($scope.memos[i] === memo){
                            $scope.memos.splice(i, 1);
                        }
                    }
                });
            }
        };

        $scope.update = function(){
            $scope.memo.$update({boardId: $stateParams.boardId},
                function(response){
                $location.path('/main/' + $stateParams.boardId + '/memo');
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };

    }
]);