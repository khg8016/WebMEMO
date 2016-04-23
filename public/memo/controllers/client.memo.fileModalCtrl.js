/**
 * Created by Jun on 2016-04-23.
 */


angular.module('memo').controller('fileModalController', ['$scope', '$location', '$stateParams', '$http','close',
    function($scope, $location, $stateParams, $http, close) {
        $http({
            method: 'get',
            url: '/api/files/' + $scope.memo._id + '/' + file._id + '/view'
        }).success(function (data) {
            $scope.img = data;
        }).error(function(data){
            console.log("in error" + data.msg);
            $scope.messgae = data.msg;
        });

        $scope.close = function(result) {
            close(result, 100);
            $location.path('/main/' + $stateParams.boardId + '/memo');
        };

    }]
);