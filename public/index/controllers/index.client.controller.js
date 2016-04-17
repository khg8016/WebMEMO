/**
 * Created by Jun on 2016-03-21.
 */
angular.module('index').controller('IndexController', ['$scope', 'Authentication', 'ModalService',
    function($scope,Authentication, ModalService){
        $scope.authentication = Authentication;
        console.log("icinc");
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