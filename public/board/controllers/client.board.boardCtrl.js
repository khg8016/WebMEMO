/**
 * Created by Jun on 2016-03-31.
 */
'use strict';

angular.module('board').controller('boardController', ['$rootScope', '$scope','$stateParams', '$http', '$state', 'ModalService','Authentication', 'Memos', 'Board', 'BoardInformation',
    function($rootScope, $scope, $stateParams, $http , $state, ModalService, Authentication, Memos, Board, BoardInformation){
        $scope.authentication = Authentication;
        $scope.boardInfo = BoardInformation;
        $scope.boardId= $stateParams.boardId;
        $scope.boards = [];
        $scope.memos = [];
        $scope.boardName="";

        $rootScope.$on('$boardCreate', function(event, board){
            $scope.boards.push(board);
        });

        $rootScope.$on('$boardEdit', function(event, board){
            for(var i= 0, len = $scope.boards.length; i<len; i++){
                if($scope.boards[i]._id === board._id){
                    $scope.boards[i].name = board.name;
                    break;
                }
            }
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

        $scope.findBoards = function(){ //보드들을 찾음
            $scope.boards = Board.query(function(){
                if($scope.boards.length == 0) $scope.boardExist=false;
                else $scope.boardExist=true;
            });
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

        $scope.update = function(board){//보드 이름 바꾸기
            board.$update(function(board){
                $rootScope.$emit('$boardEdit', board);
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

            if(board._id === $stateParams.boardId)
                $state.go('board');

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
            }).success(function (data) {
            }).error(function(data){
                console.log("in error" + data.msg);
            });

        };


        $scope.setColor = function(event, id, color){
            var el = angular.element(event.target).parent(),
                color;
            if(color == 1){
                color= "#81D4FA";
                el.css("background-color", color);
            } else if(color == 2){
                color= "#69F0AE";
                el.css("background-color", color);
            } else if(color == 3){
                color= "#FCE4EC";
                el.css("background-color", color);
            } else if(color == 4){
                color= "#E1BEE7";
                el.css("background-color", color);
            } else if(color == 5){
                color= "#ffffcc";
                el.css("background-color", color);
            }

            $http({
                method: 'put',
                url: '/api/memos/colorUpdate',
                data : {id: id, color: color}
            }).success(function (memo) {
                console.log("color updated with "+ memo.color);
                $rootScope.$emit('$memoUpdate', memo);
            }).error(function(data){
                console.log("in error" + data.msg);
            });

        }
    }
]);

