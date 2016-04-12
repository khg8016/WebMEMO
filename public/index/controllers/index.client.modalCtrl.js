/**
 * Created by Jun on 2016-04-05.
 */
angular.module('index').controller('modalController', ['$scope', '$location', '$http','close', 'Authentication',
    function($scope, $location, $http, close, Authentication) {

        $scope.message = Authentication.message;

        $scope.close = function(result) {
            close(result, 500); // close, but give 500ms for bootstrap to animate
        };

        $scope.check = function(){
            $scope.signUpForm.confirm_pw.$setValidity("unique", $scope.FormData.password == $scope.confirm_pw);
        };

        $scope.signUp = function() {
            var data = {
                username: this.username,
                password : this.password
            };
            $http({
                method: 'POST',
                url: 'http://localhost:3000/signup',
                data: data
            }).success(function (data) {
                if(data.msg != "")
                    $scope.message = data.msg;
                if(data.msg =="") {
                    window.location = '/webmemo#!/main';
                }
            }).error(function(data){
                console.log("error" + data.msg);
                $scope.messgae = data.msg;
            });
        };

        $scope.signIn = function(){
            var data = {
                username: this.username,
                password : this.password
            };

            $http({
                method: 'POST',
                url: 'http://localhost:3000/signin',
                data: data
            }).success(function (data) {
                console.log("suceess");
                if(data.msg != "")
                    $scope.message = data.msg;
                if(data.msg =="") {
                    window.location = '/webmemo#!/main';
                }
            }).error(function(data){
                console.log("in error" + data.msg);
                $scope.messgae = data.msg;
            });
        };

    }
]);