(function() {
    'use strict';
    angular.module('scoreBoard')
        .service('setMatchService', setMatchService);

    setMatchService.$inject = ['$state'];

    function setMatchService($state) {
        var vm = this;
        vm.getGroupOneCountries = getGroupOneCountries;
        vm.getGroupTwoCountries = getGroupTwoCountries;
        vm.setMatch = setMatch;

        var groupOne = ['Bangladesh', 'Australia'];
        var groupTwo = ['India', 'Pakistan'];
        var matches = []

        function getGroupOneCountries() {
            return groupOne;
        }

        function getGroupTwoCountries() {
            return groupTwo;
        }

        function setMatch(match) {
            if (localStorage.matches) {
                matches = JSON.parse(localStorage.getItem("matches"));
                match.matchId = matches.length + 1;
                matches.push(match);
                localStorage.setItem('matches', JSON.stringify(matches));
            } else {
                match.matchId = 1;
                matches.push(match);
                localStorage.setItem('matches', JSON.stringify(matches));
            }
            console.log(matches);
            $state.go('play', { matchId: 1, over: 1, ball: 0 });
        }

    }
})();