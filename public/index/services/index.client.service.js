/**
 * Created by Jun on 2016-03-21.
 */
angular.module('index').factory('Authentication', [
    function(){
        this.user = window.user;
        return {
            user : this.user
        };
}]);