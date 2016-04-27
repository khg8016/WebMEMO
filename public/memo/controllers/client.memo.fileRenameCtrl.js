/**
 * Created by Jun on 2016-04-27.
 */

angular.module('memo').controller('fileRenameController', ['$scope', '$location', '$http','close', 'memo', 'file',
    function($scope, $location, $http, close, memo, file) {
        $scope.file = file;
        $scope.memo = memo;

        $scope.close = function(result) {
            close(result, 100);
        };

        $scope.update = function(){//보드 이름 바꾸기
            $http({
                method: 'put',
                url: '/api/files/' + memo._id + '/' + file._id,
                data : {filename : $scope.file.filename}
            }).success(function (data) {
                close(100);
            }).error(function(data){
                console.log("in error" + data.msg);
            });

        };

    }]
);