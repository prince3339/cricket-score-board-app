(function(angular) {
    'use strict';
    angular.module('scoreBoard')
        .controller('playGameController', PlayGameController);

    PlayGameController.$inject = ['playGameService', '$stateParams'];

    function PlayGameController(playGameService, $stateParams) {
        var vm = this;   

        var matchIdParam = parseInt($stateParams.matchId),
            overParam = parseInt($stateParams.over),
            ballParam = parseInt($stateParams.ball);

        function bowling() {
            var matchId = parseInt($stateParams.matchId),
                over = parseInt($stateParams.over),
                ball = parseInt($stateParams.ball);
            playGameService.bowl(matchId, over, ball);
        }

        
        function loadPages() {
            var startIndex = (vm.paging.current - 1)*6,
                endIndex = startIndex + 6,
                result = angular.copy(vm.currentMatchInfo.matchResultsPerBall);

            vm.resultsFiltered = result.slice(startIndex, endIndex);
            vm.targetMatchSummary = playGameService.getMatchInfoPerBall(matchIdParam, overParam, ballParam);
        }

        vm.bowling = bowling;
        vm.targetMatchSummary = playGameService.getMatchInfoPerBall(matchIdParam, overParam, ballParam);
        vm.currentMatchInfo = playGameService.getCurrentMatchInfo(matchIdParam);        
        vm.results = vm.currentMatchInfo.matchResultsPerBall;
        vm.paging = {
            total: Math.ceil(vm.currentMatchInfo.matchResultsPerBall.length / 6),
            current: 1,
            onPageChanged: loadPages,
        };

        vm.allMatches = playGameService.getAllMatchInfo();


    }
})(window.angular);