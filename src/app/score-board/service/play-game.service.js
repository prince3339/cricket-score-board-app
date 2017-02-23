(function() {
    'use strict';
    angular.module('scoreBoard')
        .service('PlayGameService', PlayGameService);

    PlayGameService.$inject = ['$location', '$state', '$stateParams', '_'];

    function PlayGameService($location, $state, $stateParams, _) {
        var vm = this,
            allMatches,
            totalRun;
        var matchResults = [];


        function randomRunGenerator() {
            var run = [0, 1, 2, 3, 4, 6];
            return run[Math.floor(Math.random() * run.length)];
        }

        function bowl(matchId, over, ball) {

            if ($stateParams.matchId) {
                var existingMatchInfo = getCurrentMatchInfo(parseInt($stateParams.matchId));
                matchResults = existingMatchInfo.matchResults;
            }

            ball++;
            if (ball >= 6) {
                ball = 0;
                over++;
            }

            if (over == 2) {
                vm.btnDisabled = true;
            }

            var matchResultPerBall = {
                balls: ball,
                over: over,
                runPerBall: randomRunGenerator(),
                totalRun: 0,
                commentry: 'Dummy commentry!!!'
            };

            matchResults.push(matchResultPerBall);

            matchResults.forEach(function(result) {
                return result.totalRun += result.runPerBall;
            });

            saveRecordPerBall(matchResults, matchId);

            vm.matchResult = getCurrentMatchInfo(matchId);

            $state.go('play', { matchId: matchId, over: over, ball: ball });
            //getMatchInfoPerBall(matchId, over, ball);
        }

        function getCurrentMatchInfo(matchId) {
            if (localStorage.matches) {
                var matches = JSON.parse(localStorage.getItem('matches'));

                return _.find(matches, function(match) {
                    return match.matchId == matchId;
                });
            } else {
                $location.path('/start');
            }

        }

        function getMatchInfoPerBall(matchId, over, ball) {
            var targetMatch = getCurrentMatchInfo(matchId);
            var targetMatchResults = _.pick(targetMatch, 'matchResults');
            // var selectedBallsResult = _.filter(targetMatchResults.matchResults, function(result) {
            //     return result.over === over && result.balls === ball;
            // });
            var selectedBallsResult = _.find(targetMatchResults.matchResults, {balls: ball, over: over});
            var selectedBallsResultIndex = _.indexOf(targetMatchResults.matchResults, selectedBallsResult);
            console.log(targetMatchResults.matchResults);            
            return selectedBallsResultIndex;
        }

        function getAllMatchInfo() {
            return JSON.parse(localStorage.getItem('matches'));
        }

        function saveRecordPerBall(matchResults, matchId) {
            allMatches = getAllMatchInfo();
            var allMatchesUpdated = allMatches.map(function(match) {
                //var updatedMatches = {};
                if (match.matchId == matchId) {
                    match.matchResults = matchResults;
                }
                return match;
            });
            localStorage.setItem('matches', JSON.stringify(allMatchesUpdated));
        }

        vm.getCurrentMatchInfo = getCurrentMatchInfo;
        vm.saveRecordPerBall = saveRecordPerBall;
        vm.getAllMatchInfo = getAllMatchInfo;
        vm.getMatchInfoPerBall = getMatchInfoPerBall;
        vm.bowl = bowl;
    }
})();