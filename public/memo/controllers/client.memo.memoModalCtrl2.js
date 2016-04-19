/**
 * Created by Jun on 2016-04-06.
 */


angular.module('memo').controller('memoModalController2', ['$rootScope' ,'$scope', '$location', '$stateParams', 'close', 'Memos', 'Upload',
    function($rootScope, $scope, $location, $stateParams, close, Memos, Upload) {

        $scope.files = new Array();

        $scope.close = function(result) {
            close(result, 100);
            $location.path('/main/' + $stateParams.boardId + '/memo');
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

        $scope.create = function(){
            var memo = new Memos({
                title : this.title,
                contents : this.contents
            });

            memo.$save({boardId: $stateParams.boardId}, function(memo){
                //close(100);
                $scope.title = "";
                $scope.contents = "";
                $rootScope.$emit('$memoCreate', memo);
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };

       /* $scope.fileSubmit = function(){
            if ($scope.fileForm.file.$valid && $scope.file) {
                $scope.upload($scope.file);
            }
        };

        $scope.upload = function (file) {
            Upload.upload({
                url: 'upload/url',
                data: {file: file, 'username': $scope.username}
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };*/
        // for multiple files:
        $scope.uploadFiles = function (files) {
            console.log(this.files.length);
            if (this.files && this.files.length) {
                for (var i = 0; i < this.files.length; i++) {
                    Upload.upload({
                        url: 'upload/',
                        data: {file: this.files[i]}
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



    }
]);
