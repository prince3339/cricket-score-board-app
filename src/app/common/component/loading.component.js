(function(angular) {
"use strict";

angular.module('common')
        .component('loading', {
            template: '<img src="/assets/spinner.svg" ng-if="$ctrl.show">',
            controller: LoadingController
        });

    LoadingController.$inject = ['$rootScope'];
    function LoadingController($rootScope) {
        var $ctrl = this,
            listener;
        
            $ctrl.$onInit = function() {
                $ctrl.show = false;
                listener = $rootScope.$on('spinner:activate', onSpinnerActivate);
            };

            $ctrl.$onDestroy = function() {
                listener();
            };

            function onSpinnerActivate(event, data) {
                $ctrl.show = data.on;
            }

    }
})(window.angular);
