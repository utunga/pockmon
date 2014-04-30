function fullDump(obj) {
	for (var id in obj) {
      if (typeof(obj[id]) == "function") {
        dump(id + ": " + obj[id].toString());
      }
    } 
}

(function() {
   'use strict';

   /* Services */

   angular.module('pocketMon.services', ['pocketMon.service.login', 'pocketMon.service.firebase', 'pocketMon.service.changeEmail'])

      	// add/remove/get transactions
		.factory('transactionService', ['$rootScope', 'firebaseRef', function($rootScope, firebaseRef) {
			return {
				init: function() {
				   $rootScope.transactions = firebaseRef('transactions');
				},

				addTransaction: function(transaction) {
					fullDump($rootScope.transactions);
					$rootScope.transactions; //.push(transaction);
				},

				forAccount: function(accountId) {
					return $rootScope.transactions;
				}
			}
		}])

      	

})();

