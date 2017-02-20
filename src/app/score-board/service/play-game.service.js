(function() {
    'use strict';
    angular.module('scoreBoard')
        .service('PlayGameService', PlayGameService);

    PlayGameService.$inject = ['$location'];

    function PlayGameService($location) {
        var vm = this,
            allMatches;

        vm.getCurrentMatchInfo = getCurrentMatchInfo;
        vm.saveRecordPerBall = saveRecordPerBall;
        vm.getAllMatchInfo = getAllMatchInfo;

        function getCurrentMatchInfo(matchId) {
            if (localStorage.matches) {
                var matches = JSON.parse(localStorage.getItem('matches'));

                return matches.filter(function(match) {
                    return match.matchId == matchId;
                });
            } else {
                $location.path('/start');
            }

        }

        function getAllMatchInfo() {
            return JSON.parse(localStorage.getItem('matches'));
        }

        function saveRecordPerBall(matchResults, matchId) {
            allMatches = getAllMatchInfo();
            var allMatchesUpdated = allMatches.map(function(match) {
                var updatedMatches = {};
                if (match.matchId == matchId) {
                    updatedMatches.matchId = matchId;
                    updatedMatches.teamOne = match.teamOne;
                    updatedMatches.teamTwo = match.teamTwo;
                    updatedMatches.bowling = match.bowling;
                    updatedMatches.batting = match.batting;
                    updatedMatches.matchResults = matchResults;

                } else {
                    updatedMatches.matchId = matchId;
                    updatedMatches.teamOne = match.teamOne;
                    updatedMatches.teamTwo = match.teamTwo;
                    updatedMatches.bowling = match.bowling;
                    updatedMatches.batting = match.batting;
                    updatedMatches.matchResults = match.matchResults;
                }

                return updatedMatches;
            });
            localStorage.setItem('matches', JSON.stringify(allMatchesUpdated));
        }
    }
})();