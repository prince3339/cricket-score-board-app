(function() {
    'use strict';
    angular.module('scoreBoard')
        .controller('PlayGameController', PlayGameController);

    PlayGameController.$inject = ['PlayGameService', '$stateParams'];

    function PlayGameController(PlayGameService, $stateParams) {
        var vm = this;   

        var matchIdParam = parseInt($stateParams.matchId);
        var overParam = parseInt($stateParams.over);
        var ballParam = parseInt($stateParams.ball);

        function bowling() {
            var matchId = parseInt($stateParams.matchId);
            var over = parseInt($stateParams.over);
            var ball = parseInt($stateParams.ball);
            PlayGameService.bowl(matchId, over, ball);

            console.log(vm.over);
        }

        vm.bowling = bowling;
        vm.targetMatchIndex = PlayGameService.getMatchInfoPerBall(matchIdParam, overParam, ballParam);
        vm.currentMatchInfo = PlayGameService.getCurrentMatchInfo(matchIdParam);        
        console.log(vm.targetMatchIndex, matchIdParam, overParam, ballParam);
    }
})();