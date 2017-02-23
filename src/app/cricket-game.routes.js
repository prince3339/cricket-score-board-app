(function() {
    'use strict';
    angular.module('cricketGame')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/start',
                templateUrl: 'src/app/score-board/view/set-match.view.html',
                controller: 'SetMatchController',
                controllerAs: 'vm'
            })
            .state('play', {
                url: '/play/{matchId}/{over}/{ball}',
                templateUrl: 'src/app/score-board/view/play-game.view.html',
                controller: 'PlayGameController',
                controllerAs: 'vm',
                // resolve: {
                //     matchResultByParam: ['$stateParams', 'SetMatchService', function($stateParams, SetMatchService) {
                //         var p = SetMatchService.getMatchInfoPerBall($stateParams.matchId, $stateParams.over, $stateParams.ball);
                //         return SetMatchService.getMatchInfoPerBall($stateParams.matchId, $stateParams.over, $stateParams.ball);
                //     }]
                // }
            });
        $urlRouterProvider
            .otherwise('/start');
    }

})();