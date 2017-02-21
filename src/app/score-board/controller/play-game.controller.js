(function() {
    'use strict';
    angular.module('scoreBoard')
        .controller('PlayGameController', PlayGameController);

    PlayGameController.$inject = ['PlayGameService', '$stateParams'];

    function PlayGameController(PlayGameService, $stateParams) {
        var vm = this;
        vm.bowling = bowling;

        var matchId = $stateParams.matchId;
        var overParam = $stateParams.over;
        var ballParam = $stateParams.ball;

        vm.currentMatchInfo = PlayGameService.matchResult || PlayGameService.getCurrentMatchInfo(matchId);



        function bowling() {
            
            PlayGameService.bowl(matchId, overParam, ballParam);


            //var currentMatchResultLength = vm.currentMatchInfo.matchResults.length;
            //vm.over = vm.currentMatchInfo.matchResults[currentMatchResultLength - 1].over;
            //vm.balls = vm.currentMatchInfo.matchResults[currentMatchResultLength - 1].balls;
            //vm.totalRun = vm.currentMatchInfo.matchResults[currentMatchResultLength - 1].totalRun;

            console.log(vm.over);
        }

    }
})();