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
        if ($stateParams.matchId) {
            vm.existingMatchInfo = getCurrentMatchInfo($stateParams.matchId);
            matchResults = vm.existingMatchInfo.matchResults ? vm.existingMatchInfo.matchResults : [];

        }

        function randomRunGenerator() {
            var run = [0, 1, 2, 3, 4, 6];
            return run[Math.floor(Math.random() * run.length)];
        }

        function bowl(matchId, over, ball) {
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
                runPerBall: randomRunGenerator(),
                totalRun: 0,
                over: over,
                commentry: 'Dummy commentry!!!'
            };

            matchResults.push(matchResultPerBall);

            matchResults.forEach(function(result) {
                return result.totalRun += result.runPerBall;
            });

            saveRecordPerBall(matchResults, matchId);

            vm.matchResult = getCurrentMatchInfo(matchId);

            $state.go('play', { matchId: matchId, over: over, ball: ball });
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
            var selectedBallsResult = _.find(targetMatchResults.matchResults, { over: over, balls: ball });
            console.log(targetMatchResults.matchResults);
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