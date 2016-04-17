/**
/**
 * Created by Jun on 2016-04-06.
 */

angular.module('memo').controller('memoModalController', ['$scope', '$location', '$stateParams','close', 'Authentication', 'Memos', 'Comments',
    function($scope, $location, $stateParams, close, Authentication, Memos, Comments) {
        $scope.authentication = Authentication;
        $scope.memoToggle = true;
        $scope.memo = Memos.get({boardId: $stateParams.boardId, memoId : $stateParams.memoId});

        $scope.comments = Comments.query({boardId: $stateParams.boardId, memoId : $stateParams.memoId});
        $scope.commentToggle = new Array();
        $scope.cont = new Array();

        $scope.toggleEdit = function(){
                $scope.memoToggle = false;
        };

        $scope.commentToggleEdit = function(comment){
            for(var i in $scope.comments){
                if($scope.comments[i] === comment){
                    $scope.commentToggle[i] = true;
                }
            }
        };

        $scope.close = function(result) {
            close(result, 100);
            $location.path('/main/' + $stateParams.boardId + '/memo');
        };

        $scope.update = function(){
            $scope.memo.$update({boardId: $stateParams.boardId},
                function(response){
                    $scope.memoToggle = true;
                }, function(errorResponse){
                    $scope.error = errorResponse.data.message;
                }
            );
        };

        $scope.createComment = function(){
            var comment = new Comments({
                content : this.comment
            });

            comment.$save({boardId: $stateParams.boardId, memoId: $stateParams.memoId},
                function(comment){
                    $scope.comment = "";
                    $scope.comments.push(comment);

                    $scope.commentToggle[$scope.comments.length] = false;
                }, function(){
                    console.log("Error");
                });
        };

        $scope.deleteComment = function(comment){
            if(comment) {
                console.log($scope.comments[0] == comment);
                comment.$remove({boardId: $stateParams.boardId, memoId: $stateParams.memoId, commentId : comment._id},
                    function () {
                        for(var i in $scope.comments){
                            if($scope.comments[i] === comment){
                                $scope.comments.splice(i, 1);
                                $scope.commentToggle.splice(i, 1);
                            }
                        }
                    }, function () {
                        console.log("Error");
                    }
                );
            }
        };

        $scope.editComment = function(comment){
            if(comment) {
                comment.$update({boardId: $stateParams.boardId, memoId: $stateParams.memoId, commentId : comment._id},
                    function (responseComment) {
                        for(var i in $scope.comments){
                            if($scope.comments[i] === comment){
                                $scope.commentToggle[i] = false;
                                $scope.comments[i] = responseComment;
                            }
                        }
                    }, function () {
                        console.log("Error");
                    }
                );
            }

        };


    }
]);