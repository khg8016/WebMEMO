/**
 * Created by Jun on 2016-03-30.
 */

angular.module('memo').controller('memoController', ['$scope', '$stateParams', '$location', 'ModalService','Authentication', 'Memos', 'Board',
    function($scope, $stateParams, $location, ModalService, Authentication, Memos, Board){
        $scope.authentication = Authentication;
        $scope.boardId = $stateParams.boardId;

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