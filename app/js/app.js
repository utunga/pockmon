'use strict';

// Declare app level module which depends on filters, and services
angular.module('pocketMon',
      ['pocketMon.config', 'pocketMon.routes', 'pocketMon.filters', 'pocketMon.services', 'pocketMon.directives', 'pocketMon.controllers',
         'simpleLoginTools', 'routeSecurity']
   )

   .run(['loginService', '$rootScope', 'FBURL', function(loginService, $rootScope, FBURL) {
      // establish authentication
      $rootScope.auth = loginService.init('/login');
      $rootScope.FBURL = FBURL;
   
   }]);

function fullDump(obj) {
	for (var id in obj) {
      if (typeof(obj[id]) == "function") {
        dump(id + ": " + obj[id].toString());
      }
    } 
}