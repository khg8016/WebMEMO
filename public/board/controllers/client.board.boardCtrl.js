/**
 * Created by Jun on 2016-03-31.
 */
'use strict';

angular.module('board').controller('boardController', ['$rootScope', '$scope', '$stateParams','$location', 'ModalService', 'Authentication', 'Memos', 'Board', 'BoardInformation', 'Comments',
    function($rootScope, $scope, $stateParams, $location, ModalService, Authentication, Memos, Board, BoardInformation, Comments){
        $scope.authentication = Authentication;
        $scope.boardInfo = BoardInformation;
        $scope.boards = [];
        $scope.memos = [];

        $rootScope.$on('$boardCreate', function(event, board){
            $scope.boards.push(board);
        });
        $rootScope.$on('$memoCreate', function(event, memo){
            $scope.memos.push(memo);
        });

        $scope.findBoards = function(){ //보드들을 찾음
            $scope.boards = Board.query();
        };

        $scope.findMemos = function(){
            $scope.memos = Memos.query({boardId: $stateParams.boardId});
        };

        $scope.findOne = function(){ //특정 보드 찾음
            $scope.board = Board.get({boardId : $stateParams.boardId}, function(){
                $scope.boardInfo.name = $scope.board.name;
            });
        };

        $scope.delete = function(board){// 보드 제거
            if(confirm("정말 지우시겠습니까?")){
                board.$remove( function(){
                    for(var i= 0, len = $scope.boards.length; i<len; i++){
                        if($scope.boards[i] === board){
                            $scope.boards.splice(i, 1);
                        }
                    }
                });
            }

        };

        $scope.deleteMemo = function(memo){
            if(confirm("정말 지우시겠습니까?")) {
                if (memo) {
                    memo.$remove({boardId: $stateParams.boardId},
                        function () {
                            for (var i= 0, len = $scope.memos.length; i<len; i++) {
                                if ($scope.memos[i] === memo) {
                                    $scope.memos.splice(i, 1);
                                }
                            }
                        }
                    );
                }
            }
        };

        $scope.viewCreate = function() {
            if(!this.boardInfo.toggle) {
                this.boardInfo.toggle = true;
                ModalService.showModal({
                    templateUrl: 'board/views/client.board.create.html',
                    controller: "boardModalController"
                }).then(function(modal) {
                    modal.element.modal();
                });
            }
        };

        $scope.viewInfo = function() {
            ModalService.showModal({
                templateUrl: 'board/views/client.board.info.html',
                controller: "infoModalController",
                inputs : {
                    board : Board.get({boardId : $stateParams.boardId})
                }
            }).then(function(modal) {
                modal.element.modal();
            });
        };

        $scope.viewAddMember = function() {
            if(!this.boardInfo.toggle) {
                this.boardInfo.toggle = true;
                ModalService.showModal({
                    templateUrl: 'board/views/client.board.addMembers.html',
                    controller: "boardModalController"
                }).then(function(modal) {
                    modal.element.modal();
                });
            }

        };

        $scope.viewRename = function() {
            if(!this.boardInfo.toggle){
                this.boardInfo.toggle = true;
                ModalService.showModal({
                    templateUrl: 'board/views/client.board.rename.html',
                    controller: "boardRenameController",
                    inputs : {
                        board : $scope.board
                    }
                }).then(function(modal) {
                    modal.element.modal();

                });
            }
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

