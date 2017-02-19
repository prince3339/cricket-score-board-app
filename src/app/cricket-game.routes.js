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
                controller: 'setMatchController',
                controllerAs: 'vm'
            })
            .state('play', {
                url: '/play/{matchId}/{over}/{ball}',
                templateUrl: 'src/app/score-board/view/play-game.view.html',
                controller: 'playGameController',
                controllerAs: 'vm'
            });
        $urlRouterProvider
            .otherwise('/start');
    }

})();