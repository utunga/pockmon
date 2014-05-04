(function() {
   'use strict';

    /* Services */

    angular.module('pocketMon.services', ['pocketMon.service.login', 'pocketMon.service.firebase', 'pocketMon.service.changeEmail'])

      	// add/remove/get transactions
		.factory('transactionService', ['$rootScope', '$firebase', 'firebaseRef', function($rootScope, $firebase, firebaseRef) {
			var fbTransacts ;
			return {
				_init: function() {
					fbTransacts = firebaseRef('transactions')
					return this;
				},

				setTestMode: function() {
					fbTransacts = firebaseRef('test', 'transactions')
				},

				test_clearAllData: function() {
					fbTransacts.set(null);
				},

				addTransaction: function(transaction) {
					if (!(transaction.accountId))
						throw "Can't save a transaction without an accountId";
					//retrieve appropriate ledger
					var ledger = fbTransacts.child(transaction.accountId);
					
					// wrap it in an angularFire thingo
					var $ledger = $firebase(ledger);
					// add the transaction
					return $ledger.$add(transaction) // this actually works
						.then(function(ref) {
							// but this next line never gets called!!
							console.log("got to here"); 
							// .. so this never happens..
							// get the id of the added transaction 
							transaction.id = ref.name(); 
						});

					// this doesn't work either, sadly not sure why
					//ledger.push(trasaction);

				},

				forAccount: function(accountId) {
					var result = [];
					var ledger = fbTransacts.child(accountId)
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
					var ledger = fbTransacts.child(accountId)
					ledger.on("child_added", function(snapshot) {
						var transaction = snapshot.val();
						balance = balance + transaction.amt;
					});
					return balance;
				}
			}._init();
		}])

      	// add/remove/get kids
		.factory('kidService', ['$rootScope', '$firebase', 'firebaseRef', function($rootScope, $firebase, firebaseRef) {
			var transactions;
			var ref ;
		}]);

})();

