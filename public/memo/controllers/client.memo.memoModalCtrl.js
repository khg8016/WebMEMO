/**
/**
 * Created by Jun on 2016-04-06.
 */

angular.module('memo').controller('memoModalController', ['$scope', '$location', '$stateParams', '$http','close', 'Authentication', 'Memos', 'Comments', 'Upload',
    function($scope, $location, $stateParams, $http, close, Authentication, Memos, Comments, Upload) {

        $scope.memo = Memos.get({boardId: $stateParams.boardId, memoId : $stateParams.memoId});
        $scope.comments = Comments.query({boardId: $stateParams.boardId, memoId : $stateParams.memoId});

        $scope.authentication = Authentication;
        $scope.memoToggle = true;
        $scope.commentToggle = [];
        $scope.files = [];
        $scope.fileToggle = false;


        $scope.viewFiles = function(){
            $scope.fileToggle = !$scope.fileToggle;
        };

        // for multiple files:
        $scope.uploadFiles = function (files) {
            if (files && files.length) {
                for (var i = 0, len = files.length; i < len; i++) {
                    Upload.upload({
                        url: '/api/files/' + $scope.memo._id,
                        method : 'POST',
                        file : files[i]
                    }).then(function(resp) {
                        $scope.memo.files = resp.data.files;
                    }, function (resp) {
                        console.log('Error status: ' + resp.status);
                    }, function (evt) {
                        $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    });
                }
            }
        };

        $scope.downloadFile = function(file){
            $http({
                method: 'get',
                url: '/api/files/' + $scope.memo._id + '/' + file._id,
                responseType: "arraybuffer"
            }).success(function (data) {
                console.log(data.byteLength);
                /*var blob = new Blob([data], {type: 'image/png;charset=utf-8'});
                var objectUrl = (window.URL || window.webkitURL).createObjectURL(blob);
                var link = angular.element("#myLink");
                link.attr({
                    href : objectUrl,
                    download : file.filename
                })[0].click();*/
            }).error(function(data){
                console.log("in error" + data.msg);
                $scope.messgae = data.msg;
            });
        };


        $scope.deleteFile = function(file){
            if(file){
                for (var i= 0, len = $scope.memo.files.length; i < len; i++) {
                    if ($scope.memo.files[i] === file) {
                        $scope.memo.files.splice(i, 1);
                    }
                }
                $http({
                    method: 'DELETE',
                    url: '/api/files/' + $scope.memo._id + '/'+ file._id
                }).success(function (data) {
                }).error(function(data){
                    console.log("in error" + data.msg);
                });
            }
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
                    comment.$remove({
                            boardId: $stateParams.boardId,
                            memoId: $stateParams.memoId,
                            commentId: comment._id
                        },
                        function () {
                            for (var i = 0, len = $scope.comments.length; i<len; i++) {
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
                        for(var i = 0, len = $scope.comments.length; i<len; i++){
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


        $scope.toggleEdit = function(){
            $scope.memoToggle = false;
        };

        $scope.commentToggleEdit = function(comment){
            for(var i = 0, len = $scope.comments.length; i<len; i++){
                if($scope.comments[i] === comment){
                    $scope.commentToggle[i] = true;
                }
            }
        };

        $scope.close = function(result) {
            close(result, 100);
            $location.path('/main/' + $stateParams.boardId + '/memo');
        };


    }
]);