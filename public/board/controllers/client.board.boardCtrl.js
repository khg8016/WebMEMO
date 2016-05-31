/**
 * Created by Jun on 2016-03-31.
 */
'use strict';

angular.module('board').controller('boardController', ['$rootScope', '$scope','$stateParams', '$http', '$state','$location', 'ModalService','Authentication', 'Memos', 'Board', 'BoardInformation',
    function($rootScope, $scope, $stateParams, $http , $state, $location, ModalService, Authentication, Memos, Board, BoardInformation){
        $scope.authentication = Authentication;
        $scope.boardInfo = BoardInformation;
        $scope.boards = [];
        $scope.memos = [];
        $scope.boardName="";

        $rootScope.$on('$boardCreate', function(event, board){
            $scope.boards.push(board);
        });
        $rootScope.$on('$memoCreate', function(event, memo){
            $scope.memos.push(memo);
        });

        $rootScope.$on('$memoUpdate', function(event, memo){
            for (var i= 0, len = $scope.memos.length; i<len; i++) {
                if ($scope.memos[i]._id == memo._id) {
                    $scope.memos[i] = memo;
                    break;
                }
            }
        });

        $scope.go = function(state) {
            console.log("ggggg")
            $state.go(state);
        };

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

        $scope.create = function(){ //보드 생성
            var board = new Board({
                name : this.boardName
            });

            board.$save(function(board){

                $scope.boardName = " ";
                $rootScope.$emit('$boardCreate', board);
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.update = function(){//보드 이름 바꾸기
            $scope.board.$update(function(board){
                $scope.boardInfo.name = board.name;
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.delete = function(board){// 보드 제거
            if(confirm("정말 지우시겠습니까?")){
                board.$remove( function(){
                    for(var i= 0, len = $scope.boards.length; i<len; i++){
                        if($scope.boards[i] === board){
                            $scope.boards.splice(i, 1);
                            break;
                        }
                    }
                });
            }

        };

        $scope.addMember = function(req, res){
            var board = new Board({
                username : this.username
            });

            board.$save({boardId : $stateParams.boardId}, function(){
                $scope.message = "추가되었습니다.";
                $scope.username = "";
                $scope.boardInfo.toggle = false;
            }, function(errorResponse){
                $scope.message = errorResponse.data.message;
            });
        };

        $scope.deleteMemo = function(memo){
            if(confirm("정말 지우시겠습니까?")) {
                if (memo) {
                    memo.$remove({boardId: $stateParams.boardId},
                        function () {
                            for (var i= 0, len = $scope.memos.length; i<len; i++) {
                                if ($scope.memos[i] === memo) {
                                    $scope.memos.splice(i, 1);
                                    break;
                                }
                            }
                        }
                    );
                }
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


        $scope.viewMemoCreate = function() {
            ModalService.showModal({
                templateUrl: 'memo/views/client.memo.modalCreate.html',
                controller: "memoModalController2"
            }).then(function(modal) {
                modal.element.modal();
            });
        };

        $scope.onDropComplete = function(index, obj, event){
            var other = $scope.memos[index],
                index2 = $scope.memos.indexOf(obj);
            $scope.memos[index] = obj;
            $scope.memos[index2] = other;

            $http({
                method: 'put',
                url: '/api/main/' + $scope.board._id + '/memo',
                data : {index: index, index2: index2}
            }).success(function (data) {})
                .error(function(data){
                console.log("in error" + data.msg);
            });

        };
    }
]);

