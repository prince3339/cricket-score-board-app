(function() {
    'use strict';
    angular.module('scoreBoard')
        .controller('setMatchController', scoreBoardController);

    scoreBoardController.$inject = ['setMatchService'];

    function scoreBoardController(setMatchService) {
        var vm = this;

        vm.startGame = startGame;

        vm.groupOne = setMatchService.getGroupOneCountries();
        vm.groupTwo = setMatchService.getGroupTwoCountries();
        vm.bowlingStatus = 'teamOne';


        function startGame() {

            var match = {
                teamOne: vm.teamOne,
                teamTwo: vm.teamTwo,
                bowling: vm.bowlingStatus == 'teamOne' ? vm.teamOne : vm.teamTwo,
                batting: vm.bowlingStatus == 'teamOne' ? vm.teamTwo : vm.teamOne
            };

            setMatchService.setMatch(match);
        }

    }
})();