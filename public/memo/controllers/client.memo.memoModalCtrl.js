/**
/**
 * Created by Jun on 2016-04-06.
 */

angular.module('memo').controller('memoModalController', ['$scope', '$location', '$stateParams','close', 'Authentication', 'Memos', 'Comments', 'Upload',
    function($scope, $location, $stateParams, close, Authentication, Memos, Comments, Upload) {
        $scope.authentication = Authentication;
        $scope.memoToggle = true;
        $scope.memo = Memos.get({boardId: $stateParams.boardId, memoId : $stateParams.memoId});

        $scope.comments = Comments.query({boardId: $stateParams.boardId, memoId : $stateParams.memoId});
        $scope.commentToggle = new Array();

        $scope.files = new Array();

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
            if(confirm("정말 지우시겠습니까?")) {
                if (comment) {
                    console.log($scope.comments[0] == comment);
                    comment.$remove({
                            boardId: $stateParams.boardId,
                            memoId: $stateParams.memoId,
                            commentId: comment._id
                        },
                        function () {
                            for (var i in $scope.comments) {
                                if ($scope.comments[i] === comment) {
                                    $scope.comments.splice(i, 1);
                                    $scope.commentToggle.splice(i, 1);
                                }
                            }
                        }, function () {
                            console.log("Error");
                        }
                    );
                }
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

         $scope.fileSubmit = function(){
         if ($scope.fileForm.file.$valid && $scope.file) {
         $scope.upload($scope.file.name);
         }
         };

        // for multiple files:
        $scope.uploadFiles = function (files) {
            console.log(files.length);
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    Upload.upload({
                        url: '/api/files/' + $scope.memo._id,
                        method : 'POST',
                        file : files[i]
                    });
                }

                // or send them all together for HTML5 browsers:
                //Upload.upload({ data: {file: this.files}});
            }
        };

        $scope.add = function(file){
            if(file){
                $scope.files.push(file);
            }
            $scope.uploadFiles($scope.files);
        };

        $scope.deleteFile = function(file){
            if(file){
                for (var i in $scope.files) {
                    if ($scope.files[i] === file) {
                        $scope.files.splice(i, 1);
                    }

                }
            }
        };


    }
]);