(function() {
   'use strict';

   /* Services */

   angular.module('pocketMon.services', ['pocketMon.service.login', 'pocketMon.service.firebase', 'pocketMon.service.changeEmail'])

      	// add/remove/get transactions
		.factory('transactionService', ['$rootScope', 'firebaseRef', function($rootScope, firebaseRef) {
			var auth = null;
			return {
				init: function() {
				   return auth = "test";
				},

				get: function() {
				   return auth;
				}
			}
		}])

})();

