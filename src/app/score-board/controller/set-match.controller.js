(function(angular) {
    'use strict';
    angular.module('scoreBoard')
        .controller('setMatchController', SetMatchController);

    SetMatchController.$inject = ['setMatchService', 'playGameService', '$stateParams'];

    function SetMatchController(setMatchService, playGameService, $stateParams) {
        var vm = this;

        vm.startGame = startGame;

        vm.countries = setMatchService.getCountries();
        vm.bowlingStatus = 'teamOne';


        function startGame() {
            var match = {
                bowling: vm.bowlingStatus == 'teamOne' ? vm.teamOne : vm.teamTwo,
                batting: vm.bowlingStatus == 'teamOne' ? vm.teamTwo : vm.teamOne
            };


            //existingMatchInfo = PlayGameService.getCurrentMatchInfo($stateParams.matchId),
            console.log(playGameService.existingMatchInfo);
            // if (PlayGameService.existingMatchInfo.matchResults) {
            //     PlayGameService.existingMatchInfo.matchResults = [];
            // }
            // matchResults = existingMatchInfo.matchResults ? existingMatchInfo.matchResults : [];
            // console.log(PlayGameService.existingMatchInfo);
            setMatchService.setMatch(match);
        }

    }
})(window.angular);