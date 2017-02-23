(function() {
    'use strict';
    angular.module('scoreBoard')
        .service('SetMatchService', SetMatchService);

    SetMatchService.$inject = ['$state'];

    function SetMatchService($state) {
        var vm = this;
        vm.getCountries = getCountries;
        vm.setMatch = setMatch;
        
        var matches = [];

        function getCountries() {
            return {
                groupOne: ['Bangladesh', 'Australia'],
                groupTwo: ['India', 'Pakistan']
            };
        }


        function setMatch(match) {
            if (localStorage.matches) {
                matches = JSON.parse(localStorage.getItem("matches"));
                match.matchId =  matches.length + 1;
                match.matchResults = [];
                matches.push(match);
                localStorage.setItem('matches', JSON.stringify(matches));
            } else {
                match.matchId = 1;
                match.matchResults = [];
                matches.push(match);
                localStorage.setItem('matches', JSON.stringify(matches));
            }
            console.log(matches);
            $state.go('play', { matchId: match.matchId, over: 0, ball: 0 });
        }

    }
})();