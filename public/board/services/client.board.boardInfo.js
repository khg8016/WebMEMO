/**
 * Created by Jun on 2016-04-06.
 */

angular.module('board').factory('BoardInformation', ['$routeParams','Board',
    function($routeParams, Board){
        var board = {};
        board.name ="";

        return board;
    }]
);
