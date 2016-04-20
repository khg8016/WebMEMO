/**
 * Created by Jun on 2016-04-06.
 */


angular.module('memo').controller('memoModalController2', ['$rootScope' ,'$scope', '$location', '$stateParams', 'close', 'Memos', 'Upload',
    function($rootScope, $scope, $location, $stateParams, close, Memos, Upload) {

        $scope.files = [];

        $scope.close = function(result) {
            close(result, 100);
            $location.path('/main/' + $stateParams.boardId + '/memo');
        };


        $scope.create = function(){
            var memo = new Memos({
                title : this.title,
                contents : this.contents
            });

            memo.$save({boardId: $stateParams.boardId}, function(memo){
                close(100);
               /* $scope.title = "";
                $scope.contents = "";*/
                $rootScope.$emit('$memoCreate', memo);
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };

    }
]);
