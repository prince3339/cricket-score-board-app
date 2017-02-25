// (function(angular) {
//     'use strict';
//     angular.module('scoreBoard')
//         .service('playGameRestService', PlayGameRestService);

//     PlayGameRestService.$inject = ['playGameService'];

//     function PlayGameRestService(playGameService) {
//         var vm = this;
//         var allMatchResults;
//         function getAllMatchInfo() {
//             var getAllMatchPromise = playGameService.getAllMatchInfo();
//             getAllMatchPromise.then(function(response) {
//                 allMatchResults = response;
//             });

//             return allMatchResults;
//         }

//         vm.getAllMatchInfo = getAllMatchInfo;
//     }
// })(window.angular);