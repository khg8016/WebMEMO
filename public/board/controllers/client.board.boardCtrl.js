/**
 * Created by Jun on 2016-03-31.
 */
'use strict';

angular.module('board').controller('boardController', ['$scope', '$routeParams','$location', 'ModalService', 'Authentication', 'Memos', 'Board', 'BoardInformation',
    function($scope, $routeParams, $location, ModalService, Authentication, Memos, Board, BoardInformation){
        $scope.boardId = $routeParams.boardId;
        $scope.authentication = Authentication;

        $scope.boardInfo = BoardInformation;

        $scope.findBoards = function(){ //보드들을 찾음
            $scope.boards = Board.query();
        };

        $scope.findMemos = function(){
            $scope.memos = Memos.query({boardId: $routeParams.boardId});
        };

        $scope.findOne = function(){ //특정 보드 찾음
            $scope.board = Board.get({boardId : $routeParams.boardId}, function(){
                $scope.boardInfo.name = $scope.board.name;
            });

        };


        $scope.delete = function(board){// 보드 제거
            if(board){
                board.$remove( function(){
                    for(var i in $scope.boards){
                        if($scope.boards[i] === board){
                            $scope.boards.splice(i, 1);
                        }
                    }
                });
            }
        };

        $scope.deleteMemo = function(memo){
            if(memo){
                memo.$remove({boardId: $routeParams.boardId},
                    function(){
                        for(var i in $scope.memos){
                            if($scope.memos[i] === memo){
                                $scope.memos.splice(i, 1);
                            }
                        }
                    });
            } else {
                $scope.memo.$remove({boardId: $routeParams.boardId},
                    function (){
                        $location.path('/main/' + $routeParams.boardId + '/memo');
                    });
            }
        };

        $scope.viewCreate = function() {
            ModalService.showModal({
                templateUrl: 'board/views/client.board.create.html',
                controller: "boardModalController"
            }).then(function(modal) {
                modal.element.modal();
            });
        };

        $scope.viewInfo = function() {
            ModalService.showModal({
                templateUrl: 'board/views/client.board.info.html',
                controller: "infoModalController"
            }).then(function(modal) {
                modal.element.modal();
            });
        };

        $scope.viewAddMember = function() {
            ModalService.showModal({
                templateUrl: 'board/views/client.board.addMembers.html',
                controller: "boardModalController"
            }).then(function(modal) {
                modal.element.modal();
            });
        };

        $scope.viewRename = function() {
            ModalService.showModal({
                templateUrl: 'board/views/client.board.rename.html',
                controller: "boardRenameController"
            }).then(function(modal) {
                modal.element.modal();
            });
        };

        $scope.viewEdit = function() {
            ModalService.showModal({
                templateUrl: 'memo/views/client.memo.modalEdit.html',
                controller: "memoModalController"
            }).then(function(modal) {
                modal.element.modal();
            });
        };

        $scope.viewMemo = function() {
            ModalService.showModal({
                templateUrl: 'memo/views/client.memo.modalView.html',
                controller: "memoModalController"
            }).then(function(modal) {
                modal.element.modal();
            });
        };

        $scope.viewMemoCreate = function() {
            ModalService.showModal({
                templateUrl: 'memo/views/client.memo.modalCreate.html',
                controller: "memoModalController2"
            }).then(function(modal) {
                modal.element.modal();
            });
        };


    }
]);

