(function() {
    'use strict';
    angular.module('cricketGame', ['ui.router', 'ngMaterial', 'scoreBoard']);

    angular.element(function() {
        angular.bootstrap(document, ['cricketGame']);
    });
})();