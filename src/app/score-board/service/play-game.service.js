(function() {
    'use strict';
    angular.module('scoreBoard')
        .service('playGameService', playGameService);

    playGameService.$inject = [];

    function playGameService() {
        var vm = this;
        vm.getCurrentMatchInfo = getCurrentMatchInfo;

        function getCurrentMatchInfo(matchID) {
            var matches = JSON.parse(localStorage.getItem('matches'));

            return matches.filter(function(match) {
                return match.matchID == matchID;
            });
        }
    }
})();