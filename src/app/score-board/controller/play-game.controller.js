(function() {
    'use strict';
    angular.module('scoreBoard')
        .controller('PlayGameController', PlayGameController);

    PlayGameController.$inject = ['PlayGameService', '$stateParams'];

    function PlayGameController(PlayGameService, $stateParams) {
        var vm = this;
        vm.bowling = bowling;

        var matchId = $stateParams.matchId;

        var balls = 0,
            runPerBall = 0,
            over = 0,
            totalRun = 0,
            matchResults = [];

        //vm.currentMatchInfo = PlayGameService.getCurrentMatchInfo(matchId);

        function randomRunGenerator() {
            var run = [0, 1, 2, 3, 4, 6];
            return run[Math.floor(Math.random() * run.length)];
        }

        function bowling() {
            balls++;
            runPerBall = randomRunGenerator();
            if (balls == 6) {
                balls = 0;
                over++;
            }
            totalRun += runPerBall;
            if (over == 2) {
                vm.btnDisabled = true;
            }

            var matchResultPerBall = {
                balls: balls,
                runPerBall: runPerBall,
                totalRun: totalRun,
                over: over,
                commentry: 'Dummy commentry!!!'
            };

            matchResults.push(matchResultPerBall);
            PlayGameService.saveRecordPerBall(matchResults, matchId);
            vm.currentMatchInfo = PlayGameService.getCurrentMatchInfo(matchId);
            var currentMatchResultLength = vm.currentMatchInfo[0].matchResults.length;
            vm.over = vm.currentMatchInfo[0].matchResults[currentMatchResultLength].over;
            console.log(vm.over);
        }

    }
})();