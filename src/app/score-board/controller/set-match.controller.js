(function() {
    'use strict';
    angular.module('scoreBoard')
        .controller('SetMatchController', SetMatchController);

    SetMatchController.$inject = ['SetMatchService'];

    function SetMatchController(SetMatchService) {
        var vm = this;

        vm.startGame = startGame;

        vm.groupOne = SetMatchService.getGroupOneCountries();
        vm.groupTwo = SetMatchService.getGroupTwoCountries();
        vm.bowlingStatus = 'teamOne';


        function startGame() {
            var match = {
                teamOne: vm.teamOne,
                teamTwo: vm.teamTwo,
                bowling: vm.bowlingStatus == 'teamOne' ? vm.teamOne : vm.teamTwo,
                batting: vm.bowlingStatus == 'teamOne' ? vm.teamTwo : vm.teamOne
            };

            SetMatchService.setMatch(match);
        }

    }
})();