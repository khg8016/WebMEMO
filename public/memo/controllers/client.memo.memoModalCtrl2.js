/**
 * Created by Jun on 2016-04-06.
 */


angular.module('memo').controller('memoModalController2', ['$rootScope' ,'$scope', '$location', '$stateParams', 'close', 'Memos', 'Upload',
    function($rootScope, $scope, $location, $stateParams, close, Memos, Upload) {

        $scope.fileList = [];

        $scope.close = function(result) {
            close(result, 100);
            $location.path('/main/' + $stateParams.boardId + '/memo');
        };


        $scope.create = function(){
            var memo = new Memos({
                title : this.title,
                contents : this.contents
            });

            memo.$save({boardId: $stateParams.boardId},
                function(memo){
                    $rootScope.$emit('$memoCreate', memo);
                    console.log("fdsafsazzzzz/" + memo._id);
                    if ($scope.form.files.$valid && $scope.files) {
                        $scope.uploadFiles($scope.files, memo._id);
                    }
                    close(100);
                }, function(errorResponse){
                    $scope.error = errorResponse.data.message;
                });
        };


$scope.uploadFiles = function (files, memoId) {
    if (files && files.length) {
        for (var i = 0, len = files.length; i < len; i++) {
            Upload.upload({
                url: '/api/files/' + memoId,
                method : 'POST',
                file : files[i]
            }).then(function(resp) {
            });
        }
    }

};

$scope.add = function(files){
    if (files && files.length) {
        for (var i = 0, len = files.length; i < len; i++) {
            $scope.fileList.push(files[i]);
        }
    }
};

}
]);
