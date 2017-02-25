(function (angular) {
"use strict";
    angular.module('common')
           .component('toobarComponent', {
                templateUrl: 'src/app/common/component/view/toolbar.view.html',
                bindings: {
                    appTitle: '@',
                    themeName: '@'
                }
            });
})(window.angular);
