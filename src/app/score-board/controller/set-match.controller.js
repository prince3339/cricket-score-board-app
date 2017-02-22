(function() {
    'use strict';
    angular.module('scoreBoard')
        .controller('SetMatchController', SetMatchController);

    SetMatchController.$inject = ['SetMatchService', 'PlayGameService', '$stateParams'];

    function SetMatchController(SetMatchService, PlayGameService, $stateParams) {
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


            //existingMatchInfo = PlayGameService.getCurrentMatchInfo($stateParams.matchId),
            console.log(PlayGameService.existingMatchInfo);
            // if (PlayGameService.existingMatchInfo.matchResults) {
            //     PlayGameService.existingMatchInfo.matchResults = [];
            // }
            // matchResults = existingMatchInfo.matchResults ? existingMatchInfo.matchResults : [];
            // console.log(PlayGameService.existingMatchInfo);
            SetMatchService.setMatch(match);
        }

    }
})();