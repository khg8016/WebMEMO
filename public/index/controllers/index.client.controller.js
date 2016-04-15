/**
 * Created by Jun on 2016-03-21.
 */
angular.module('index').controller('IndexController', ['$scope', '$http', '$route', 'Authentication', 'ModalService',
    function($scope, $http , $route,Authentication, ModalService){
        $scope.authentication = Authentication;

       $scope.modalSignIn = function() {
            ModalService.showModal({
                templateUrl: 'index/views/signin.html',
                controller: "modalController"
            }).then(function(modal) {
                modal.element.modal();
            });
        };

        $scope.modalSignUp = function() {
            ModalService.showModal({
                templateUrl: 'index/views/signup.html',
                controller: "modalController"
            }).then(function(modal) {
                modal.element.modal();
            });
        };
    }
]);