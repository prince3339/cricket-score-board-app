(function() {
    'use strict';
    angular.module('scoreBoard')
        .service('PlayGameService', PlayGameService);

    PlayGameService.$inject = ['$location', '$state', '$stateParams', '_'];

    function PlayGameService($location, $state, $stateParams, _) {
        var vm = this,
            allMatches,
            totalRun;
        var matchResultsPerBall = [];


        function randomRunGenerator() {
            var run = [0, 1, 2, 3, 4, 6];
            return run[Math.floor(Math.random() * run.length)];
        }

        function bowl(matchId, over, ball) {

            if ($stateParams.matchId) {
                var existingMatchInfo = getCurrentMatchInfo(parseInt($stateParams.matchId));
                matchResultsPerBall = existingMatchInfo.matchResultsPerBall;
            }

            ball++;
            if (ball >= 6) {
                ball = 0;
                over++;
            }

            var perBallStats = {
                balls: ball,
                over: over,
                runPerBall: randomRunGenerator(),
                commentry: 'Dummy commentry!!!',
            };

           
            
            var gameOver = over==2? true:false;

            matchResultsPerBall.push(perBallStats);

            totalRun = matchResultsPerBall.reduce(function(initialValue, result) {
                return initialValue + result.runPerBall;
            }, 0);
            

            saveRecordPerBall(matchResultsPerBall, matchId, gameOver, totalRun);

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
            var targetMatchResults = _.pick(targetMatch, 'matchResultsPerBall');
            // var selectedBallsResult = _.filter(targetMatchResults.matchResults, function(result) {
            //     return result.over === over && result.balls === ball;
            // });
            var selectedBallsResult = _.find(targetMatchResults.matchResultsPerBall, {balls: ball, over: over});
            var selectedBallsResultIndex = _.indexOf(targetMatchResults.matchResultsPerBall, selectedBallsResult);
            console.log(targetMatchResults.matchResultsPerBall);            
            return {
                lastBallResult : selectedBallsResult,
                lastBallIndex : selectedBallsResultIndex
            };
        }

        function getAllMatchInfo() {
            return JSON.parse(localStorage.getItem('matches'));
        }

        function saveRecordPerBall(matchResultsPerBall, matchId, gameOver, totalRun) {
            allMatches = getAllMatchInfo();
            var allMatchesUpdated = allMatches.map(function(match) {
                //var updatedMatches = {};
                if (match.matchId == matchId) {
                    match.matchResultsPerBall = matchResultsPerBall;
                    match.gameOver = gameOver;
                    match.totalRun = totalRun;
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