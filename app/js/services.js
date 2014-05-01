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

				addTransaction: function(transaction) {
					ref.push(transaction);
				},

				forAccount: function(accountId) {
					var result = [];
					ref.on("child_added", function(snapshot) {
						var trans = snapshot.val();
						// actually it would be better to 
						// store transactions under their own key 
						if (trans.AccountId === accountId)
							result.push(snapshot.val());
					});
					//FIXME1 how can we be sure the above has returned 
					// should use a promise in some way here
					return result;
				}
			}
		}])

      	

})();

