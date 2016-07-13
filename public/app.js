/**
 * Created by Jun on 2016-03-21.
 */
var mainApplicationModuleNmae = 'webmemo';

var mainApplicationModule = angular.module(mainApplicationModuleNmae, ['ngCookies', 'ngResource', 'ngFileUpload', 'ngDraggable', 'ui.router', 'index', 'memo', 'board', 'angularModalService', 'nsPopover']); //모듈 생성 []안에있는거는 커스텀 모듈 혹은 외부모듈

mainApplicationModule.config(['$locationProvider', function ($locationProvider){
    $locationProvider.hashPrefix('!'); //single page application을 알리기위해 설정~
}]);

if(window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function(){
    angular.bootstrap(document, [mainApplicationModuleNmae]); //앞서 정의한 모듈로 angular 어플리케이션 시작
});


