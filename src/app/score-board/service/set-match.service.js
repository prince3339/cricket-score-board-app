(function(angular) {
    'use strict';
    angular.module('scoreBoard')
        .service('setMatchService', SetMatchService);

    SetMatchService.$inject = ['$state'];

    function SetMatchService($state) {
        var vm = this;
        vm.getCountries = getCountries;
        vm.setMatch = setMatch;
        
        var matches;

        function getCountries() {
            return {
                groupOne: ['Bangladesh', 'Australia'],
                groupTwo: ['India', 'Pakistan']
            };
        }


        function setMatch(match) {
            matches = localStorage.matches? (JSON.parse(localStorage.getItem("matches"))) : [];
            match.matchId = matches? matches.length + 1: 1;
            match.matchResultsPerBall = [];
            //match.matchResults.totalRun = 0;
            matches.push(match);
            localStorage.setItem('matches', JSON.stringify(matches));

            console.log(matches);
            $state.go('play', { matchId: match.matchId, over: 0, ball: 0 });
        }

    }
})(window.angular);