/**
 * Created by Jun on 2016-04-06.
 */

angular.module('board').factory('BoardInformation', ['$stateParams','Board',
    function($stateParams, Board){
        var board = {};
        board.name ="";
        board.count = 0;
        return board;
    }]
);
