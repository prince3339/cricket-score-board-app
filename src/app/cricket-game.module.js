(function(angular, _) {
    'use strict';
    angular.module('cricketGame', ['ui.router', 'ngMaterial', 'scoreBoard'])
           .constant('_', _);

    angular.element(function() {
        angular.bootstrap(document, ['cricketGame']);
    });
})(window.angular, window._);
