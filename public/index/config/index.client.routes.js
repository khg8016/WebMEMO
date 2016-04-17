/**
 * Created by Jun on 2016-03-21.
 */
angular.module('index').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

       // $urlRouterProvider.otherwise('/');
        $urlRouterProvider.when('', '/');

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'index/views/index.html',
                controller: 'IndexController'
            });


       // $urlRouterProvider.otherwise('/');



    }]);


