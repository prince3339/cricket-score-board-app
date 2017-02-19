(function() {
    'use strict';
    angular.module('scoreBoard')
        .controller('playGameController', playGameController);

    playGameController.$inject = ['playGameService', '$stateParams'];

    function playGameController(playGameService, $stateParams) {
        var vm = this;

        var matchId = $stateParams.matchId;
        vm.currentMatchInfo = playGameService.getCurrentMatchInfo(matchId);
        console.log(vm.currentMatchInfo);

    }
})();