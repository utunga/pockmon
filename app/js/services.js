(function() {
   'use strict';

   /* Services */

   angular.module('pocketMon.services', ['pocketMon.service.login', 'pocketMon.service.firebase', 'pocketMon.service.changeEmail'])

      	// add/remove/get transactions
		.factory('transactionService', ['$rootScope', '$firebase', 'firebaseRef', function($rootScope, $firebase, firebaseRef) {
			var transactions;
			var ref ;
			return {
				init: function() {
					ref = firebaseRef('transactions')
					transactions = $firebase(ref);
				},

				clearAllData: function() {
					ref.set(null);
				},

				addTransaction: function(transaction) {
					if (!(transaction.accountId))
						throw "Can't save a transaction without an accountId";
					//retrieve appropriate ledger
					var ledger = ref.child(transaction.accountId)
					ledger.push(transaction);
				},

				forAccount: function(accountId) {
					var result = [];
					var ledger = ref.child(accountId)
					ledger.on("child_added", function(snapshot) {
						var trans = snapshot.val();
						result.push(snapshot.val());
					});
					//FIXME1 how can we be sure the above has returned 
					// should use a promise in some way here
					return result;
				},

				balanceForAccount: function(accountId) {
					//FIXME should use some sort of js map function reallly
					var balance = 0;
					var ledger = ref.child(accountId)
					ledger.on("child_added", function(snapshot) {
						var transaction = snapshot.val();
						balance = balance + transaction.amt;
					});
					return balance;
				}
			}
		}])

      	

})();

