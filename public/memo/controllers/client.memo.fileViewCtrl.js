/**
 * Created by Jun on 2016-04-23.
 */


angular.module('memo').controller('fileViewController', ['$scope', '$location', '$http','close', 'memo', 'file',
    function($scope, $location, $http, close, memo, file) {
        $http({
            method: 'get',
            url: '/api/files/' + memo._id + '/' + file._id + '/view'
        }).success(function (data) {
            $scope.img = data;
            $scope.fileName = file.filename;
        }).error(function(data){
            console.log("in error" + data.msg);
        });

    }]
);